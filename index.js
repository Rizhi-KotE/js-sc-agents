import {scKeynodes, sctpClient} from "./src/service/Singletons";

import ScAgentRegistry from "./src/ScAgentRegistry"

export const scAgentRegistry = new ScAgentRegistry();
scAgentRegistry.init();
