import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("sibling-equation-test", "routes/siblingTest.tsx"),
] satisfies RouteConfig;
