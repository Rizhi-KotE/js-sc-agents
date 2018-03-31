import {ScAgentsRepository} from "./ScAgentsRepository";

export default class ScAgentRegistry {

    constructor() {
        console.log(`Create ScAgentRegistry`);
        this.definedAgents = {};
        this.registeredAgents = {};
        this.scAgentRepository = new ScAgentsRepository();
    }

    async _fetchAgentsDefinition() {
        const agentDefinitions = this.scAgentRepository.loadAgentsDefinition();
        for (const idx in agentDefinitions) {
            this.definedAgents(agentDefinitions[idx]);
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
    }

    /**
     * Register agent function
     * To activate should define agent with same sysIdtf
     * @param agentDefinition
     * @returns {Promise.<void>}
     */
    async register(sysIdtf, agentFunction) {
        if (this.registeredAgents[sysIdtf]) throw new Error(`Allready has active agent with sysAddr ${sysIdtf}`);
        this.registeredAgents[sysIdtf] = agentFunction;
        await this.subscribeToEvent(this.definedAgents[sysIdtf], agentFunction);
    }

    async activateIfCan(sysIdtf){
        if(this.definedAgents[sysIdtf] && this.registeredAgents[sysIdtf]){
            this._subscribeToEvent(sysIdtf);
        }
    }

    async init() {
        await this._fetchAgentsDefinition();
    }

    async _subscribeToEvent(sysIdtf) {
        const agentDefinition = this.definedAgents[sysIdtf];
        const executor = this.registeredAgents[sysIdtf];
        const scEventType = await this.eventTypeUtils.getSctpEventType(agentDefinition.eventTypeAddr);
        console.log(`Subscribing for event type ${scEventType} and target ${agentDefinition.eventTargetAddr}`);
        await sctpClient.event_create(scEventType, agentDefinition.eventTargetAddr, executor);
    }

}

