import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Google Form Redirect Extension",
  version: "1.0.0",
  description:
    "Automatically redirect to nnn.ed.jp if the Google Form cannot be opened.",
  host_permissions: ["https://docs.google.com/*"],
  content_scripts: [
    {
      matches: ["https://docs.google.com/forms/*"],
      js: ["src/content.ts"],
    },
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
});
