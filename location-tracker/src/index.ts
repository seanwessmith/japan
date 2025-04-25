const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

function withCors(response) {
	for (const [k, v] of Object.entries(CORS_HEADERS)) {
		response.headers.set(k, v);
	}
	return response;
}

async function handle(request, env) {
	const url = new URL(request.url);
	const { pathname, method } = url;

	// preflight
	if (method === 'OPTIONS') {
		return new Response(null, { status: 204 });
	}

	if (pathname === '/location-update' && method === 'POST') {
		const { latitude, longitude, altitude } = await request.json();
		await env.LOCATION_KV.put('latest', JSON.stringify({ latitude, longitude, altitude }));
		return new Response('OK', { status: 200 });
	}

	if (pathname === '/api/latest-location' && method === 'GET') {
		const data = await env.LOCATION_KV.get('latest');
		if (!data) return new Response('No data', { status: 404 });
		return new Response(data, {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response('Not found', { status: 404 });
}

addEventListener('fetch', (event) => {
	event.respondWith(
		(async () => {
			try {
				// run your logic
				const resp = await handle(event.request, event.env);
				// always attach CORS
				return withCors(resp);
			} catch (err) {
				// log it so tail will show it
				console.error('Uncaught error:', err);
				// return a CORS’d 500
				return withCors(new Response('Internal Error', { status: 500 }));
			}
		})()
	);
});
