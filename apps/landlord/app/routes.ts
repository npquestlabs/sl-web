// import { type RouteConfig } from '@react-router/dev/routes';
// import { flatRoutes } from '@react-router/fs-routes';

// export default flatRoutes() satisfies RouteConfig;
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),

  layout("routes/_auth.tsx", [
    route("login", "routes/_auth.login.tsx"),
    route("signup", "routes/_auth.signup.tsx"),
    route("forgot-password", "routes/_auth.forgot-password.tsx"),
  ]),

  route("reset-password", "routes/reset-password.tsx"),

  ...prefix("dashboard", [
    layout("routes/dashboard.tsx", [
      index("routes/dashboard._index.tsx"),
      route("properties", "routes/dashboard.properties.tsx"),
      route("payments", "routes/dashboard.payments.tsx"),
      route("leases", "routes/dashboard.leases.tsx"),
    ]),
  ]),
] satisfies RouteConfig;