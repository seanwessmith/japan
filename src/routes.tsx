import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import Osaka from "./osaka";
import Tokyo from "./japan";

const Routes = () => (
  <Router>
    <ReactRoutes>
      {/* Redirect root to Tokyo */}
      <Route path="/" element={<Navigate to="/tokyo" replace />} />
      {/* Route definitions */}
      <Route path="/tokyo" element={<Tokyo />} />
      <Route path="/osaka" element={<Osaka />} />
      {/* Fallback for unmatched routes */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </ReactRoutes>
  </Router>
);

export default Routes;
