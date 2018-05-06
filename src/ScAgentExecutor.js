import {core} from "SCWeb";
import {scKeynodes} from "./service/scKeynodes";
import * as R from "ramda";


export class ScAgentExecutor {
    constructor() {
        this.agents = {};
    }

    subscribe(agentDefinition, executor) {
        const scEventType = agentDefinition.scEventType;
        console.log(`Subscribing for event type ${scEventType} and target ${agentDefinition.eventTargetAddr}`);
        sctpClient.event_create(scEventType, agentDefinition.eventTargetAddr,
            R.curryN(3, ScAgentExecutor.execute)(agentDefinition, executor));
    }

    static async execute(agentDefinition, executor, targetAddr, argAddr) {
            executor({agentDefinition, targetAddr, argAddr});
    }

    failedFinish(agentDefinition, targetAddr) {

    }

    successfulFinish(agentDefinition, targetAddr) {

    }
}