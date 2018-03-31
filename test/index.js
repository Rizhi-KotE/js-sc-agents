import "../node_modules/mocha/mocha.css";
import "../node_modules/mocha/mocha.js";
window.jQuery = $;
mocha.setup('bdd');
import "./ScAgentFunctional.test";
import "../GetSysIdtf.spec"
mocha.checkLeaks();
mocha.run();
