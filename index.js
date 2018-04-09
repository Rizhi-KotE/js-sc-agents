import ScAgentRegistry from "./src/ScAgentRegistry"
import TypicalAgentDecorator from "./src/agentDecorators/TypicalAgentDecorator";

export const scAgentRegistry = new ScAgentRegistry();
scAgentRegistry.init();

scAgentRegistry.register("dummy_sc_agent", TypicalAgentDecorator(console.log));
