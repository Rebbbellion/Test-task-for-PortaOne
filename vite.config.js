import injectHTML from "vite-plugin-html-inject";
import Inspect from "vite-plugin-inspect";

export default {
  base: "",
  plugins: [Inspect(), injectHTML()],
};
