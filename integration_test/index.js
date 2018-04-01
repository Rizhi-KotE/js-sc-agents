import "../node_modules/mocha/mocha.css";
import "../node_modules/mocha/mocha.js";
import "./mocha-setup"
import "./ScAgentFunctional";
import * as $ from "jquery";
window.$ = $;
mocha.run();
