import "../node_modules/mocha/mocha.css";
import "../node_modules/mocha/mocha.js";
import "./mocha-setup"
import "./ScAgentFunctional";
import "./ScAgentExecutor"
import * as $ from "jquery";
window.$ = $;
mocha.run();
