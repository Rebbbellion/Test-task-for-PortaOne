import injectHTML from "vite-plugin-html-inject";
import Inspect from "vite-plugin-inspect";

export default {
  base: "/Test-task-for-PortaOne/",
  plugins: [Inspect(), injectHTML()],
};
