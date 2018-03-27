import {scKeynodes, sctpClient} from "./src/sevice/Singletons";

import ScAgentRegistry from "./src/ScAgentRegistry"

export const scAgentRegistry = new ScAgentRegistry();
scAgentRegistry.init();
