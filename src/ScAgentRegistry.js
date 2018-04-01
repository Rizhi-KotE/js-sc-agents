import {ScAgentsRepository} from "./ScAgentsRepository";
import {sctpClient} from "./service/sctpClient";
import validate from "./ValidationUtils";

export default class ScAgentRegistry {

    constructor() {
        console.log(`Create ScAgentRegistry`);
        this.definedAgents = {};
        this.registeredAgents = {};
        this.scAgentRepository = new ScAgentsRepository();
    }

    async _fetchAgentsDefinition() {
        const agentDefinitions = await this.scAgentRepository.loadAgentsDefinition();
        for (const idx in agentDefinitions) {
            this.defineAgent(agentDefinitions[idx]);
        }
    }

    /**
     * Define agent in registry
     * To activate should register agent with same sysIdtf
     * @param agentDefinition
     * @returns {Promise.<void>}
     */
    async defineAgent(agentDefinition) {
        this.definedAgents[agentDefinition.agentSysIdtf] = agentDefinition;
        console.log(`Registrate sc-agent with sys-id ${agentDefinition.agentSysIdtf}`);
        await this.activateIfCan(agentDefinition.agentSysIdtf);
    }

    /**
     * Register agent function
     * To activate should define agent with same sysIdtf
     * @param agentDefinition
     * @returns {Promise.<void>}
     */
    async register(sysIdtf, agentFunction) {
        validate(arguments, ["string", "function"]);
        if (this.registeredAgents[sysIdtf]) throw new Error(`Allready has active agent with sysAddr ${sysIdtf}`);
        this.registeredAgents[sysIdtf] = agentFunction;
        await this.activateIfCan(sysIdtf);
    }

    async activateIfCan(sysIdtf){
        validate(arguments, ["string"]);
        if(this.definedAgents[sysIdtf] && this.registeredAgents[sysIdtf]){
            await this._subscribeToEvent(sysIdtf);
        }
    }

    async init() {
        await this._fetchAgentsDefinition();
    }

    /**
     * Register agent executor as callback on sc-event
     * Type and target off sc-event fetch from definition
     * @param sysIdtf - sys-idtf of already registered agent
     * @returns {Promise.<void>}
     * @private
     */
    async _subscribeToEvent(sysIdtf) {
        validate(sysIdtf, ["string"]);
        const agentDefinition = this.definedAgents[sysIdtf];
        const executor = this.registeredAgents[sysIdtf];
        const scEventType = agentDefinition.scEventType;
        console.log(`Subscribing for event type ${scEventType} and target ${agentDefinition.eventTargetAddr}`);
        await sctpClient.event_create(scEventType, agentDefinition.eventTargetAddr, executor);
    }

}

