import { defineConfig } from "astro/config";
import { SITE } from "./src/config.mjs";

export default defineConfig({
  site: SITE.dominio || undefined,
  // CSS dentro la pagina: niente file che blocca il caricamento
  build: { inlineStylesheets: "always" },
});
