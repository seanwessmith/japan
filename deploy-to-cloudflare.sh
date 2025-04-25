#!/usr/bin/env bash
set -e

# ─── CONFIG ─────────────────────────────────────────────────────────────────

PROJECT_NAME="japan"
DIST_DIR="./dist"
CUSTOM_DOMAIN="japan.seanwesleysmith.com"
ACCOUNT_ID="df69bdcad63997be6e6241eef973d718"
ENV_FILE=".env"

# ─── LOAD TOKEN ─────────────────────────────────────────────────────────────

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found."
  exit 1
fi

CLOUDFLARE_API_TOKEN=$(grep '^CLOUDFLARE_API_TOKEN=' "$ENV_FILE" \
  | cut -d '=' -f2- | tr -d '"')
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "Error: CLOUDFLARE_API_TOKEN not set in $ENV_FILE."
  exit 1
fi

# ─── BUILD ─────────────────────────────────────────────────────────────────

if [ ! -d "$DIST_DIR" ]; then
  echo "Error: $DIST_DIR not found. Run 'vite build' first."
  exit 1
fi
vite build

# ─── PAGES PROJECT ──────────────────────────────────────────────────────────

# echo "⟳ Checking for Pages project '$PROJECT_NAME'…"
# if ! wrangler pages project list | grep -q "^$PROJECT_NAME\$"; then
#   echo "✚ Creating project '$PROJECT_NAME'…"
#   wrangler pages project create "$PROJECT_NAME" --production-branch main
# else
#   echo "✔ Project already exists."
# fi

# ─── DEPLOY ─────────────────────────────────────────────────────────────────

echo "⟳ Deploying to Pages (branch: main)…"
wrangler pages deploy "$DIST_DIR" \
  --project-name "$PROJECT_NAME" \
  --branch main

# ─── PAGES DOMAIN ──────────────────────────────────────────────────────────

echo "⟳ Registering Pages custom domain…"
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"name\":\"$CUSTOM_DOMAIN\"}" \
  | jq .

# ─── DNS RECORD ─────────────────────────────────────────────────────────────

# derive zone & record names
ZONE_NAME="${CUSTOM_DOMAIN#*.}"           # e.g. "seanwesleysmith.com"
RECORD_NAME="${CUSTOM_DOMAIN%%.*}"        # e.g. "japan"
PAGES_HOST="${PROJECT_NAME}-dmx.pages.dev" # your pages production domain

# 1. fetch zone ID
echo "⟳ Fetching Zone ID for $ZONE_NAME…"
ZONE_ID=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  | jq -r '.result[0].id')
if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" == "null" ]; then
  echo "Error: could not find zone $ZONE_NAME"
  exit 1
fi

# 2. ensure CNAME doesn’t already exist
EXISTS=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=$CUSTOM_DOMAIN" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  | jq '.result | length')

if [ "$EXISTS" -gt 0 ]; then
  echo "✔ CNAME $CUSTOM_DOMAIN already exists."
else
  echo "✚ Creating CNAME $CUSTOM_DOMAIN → $PAGES_HOST (DNS only)…"
  curl -s -X POST \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{
      "type":"CNAME",
      "name":"'"$RECORD_NAME"'",
      "content":"'"$PAGES_HOST"'",
      "ttl":1,
      "proxied":false
    }' | jq .
fi

echo "✅ Done! Your site is live at https://$CUSTOM_DOMAIN"