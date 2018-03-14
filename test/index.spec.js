import "../node_modules/mocha/mocha.css";
import "../node_modules/mocha/mocha.js";
window.jQuery = $;
mocha.setup('bdd');
import "./ScAgentFunctional.spec";
mocha.checkLeaks();
mocha.run();
