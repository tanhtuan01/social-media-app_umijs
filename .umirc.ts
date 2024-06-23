import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/register", component: "@/pages/register", layout: false, title: "Register" },
    { path: "/login", component: "@/pages/login", layout: false },
    { path: "/profile", component: "@/pages/profile" },
    { path: "/home", redirect: "/" },
    { path: "/todo", component: "@/pages/todo" },
  ],
  npmClient: 'pnpm',
});
