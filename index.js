import ScAgentRegistry from "./src/ScAgentRegistry"

export const scAgentRegistry = new ScAgentRegistry();
scAgentRegistry.init();

scAgentRegistry.register("dummy_sc_agent", console.log);
