import {core} from "SCWeb";
import {scKeynodes} from "./service/scKeynodes";


export class ScAgentExecutor {
    constructor() {
        this.agents = {};
    }

    subscribe(agentDefinition, executor) {

    }

    async execute(agentDefinition, executor, targetAddr) {
        try {
            if (await this.checkInitCondition(agentDefinition.initCondAddr)) {
                executor(targetAddr);
            }
            this.successfulFinish(agentDefinition, targetAddr);
        } catch (e) {
            this.failedFinish(agentDefinition, targetAddr);
        }
    }

    /**
     * Use finding pattern to check init condition
     * @param initCondAddr
     * @returns {Promise.<void>}
     */
    async checkInitCondition(initCondAddr) {
        const commandAddr = await scKeynodes.resolveKeynode('ui_menu_na_view_kb_pattern');
        await core.Server.doCommand(initCondAddr, [initCondAddr]);
    }

    failedFinish(agentDefinition, targetAddr) {

    }

    successfulFinish(agentDefinition, targetAddr) {

    }
}