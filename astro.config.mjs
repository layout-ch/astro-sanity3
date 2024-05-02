import { defineConfig } from 'astro/config';
import liciousI18n from "@astrolicious/i18n";

import { sanityIntegration } from "@sanity/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [liciousI18n({
    defaultLocale: "fr",
    locales: ["fr", "de", "en"],
    strategy: 'prefix',
    sitemap: true
  }), sanityIntegration(
    {
      projectId: "54p00593",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/admin"
    }
  ), react()]
});