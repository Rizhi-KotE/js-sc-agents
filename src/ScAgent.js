import {SctpEventType} from "@ostis/sc-network";

const SC_RESULT_ERROR = 0;                //unknown error
const SC_RESULT_OK = 1;                   //no any error
const SC_RESULT_ERROR_INVALID_PARAMS = 2; //invalid function parameters error
const SC_RESULT_ERROR_INVALID_TYPE = 3;   //invalied type error
const SC_RESULT_ERROR_IO = 4;             //input/output error
const SC_RESULT_ERROR_INVALID_STATE = 5;  //invalid state of processed object
const SC_RESULT_ERROR_NOT_FOUND = 6;      //item not found
const SC_RESULT_ERROR_NO_WRITE_RIGHTS = 7;//no ritghs to change or delete object
const SC_RESULT_ERROR_NO_READ_RIGHTS = 8; //no ritghs to read object
const SC_RESULT_NO = 9;                   //no any result
const SC_RESULT_UNKNOWN = 10;             // result unknown

export const agentsKeynodes = [
    'command_initiated',
    'command_finished',
    'nrel_result',
    'sc_result_noconst ',
    'sc_result_unknown',
    'sc_result_error',
    'sc_result_error_invalid_params',
    'sc_result_error_invalid_type',
    'sc_result_error_io',
    'sc_result_invalid_state',
    'sc_result_error_not_found',
    'sc_result_error_no_write_rights',
    'sc_result_error_no_read_rights'];

export class ScAgent {
    constructor(sctpClient, keynodes) {
        this.sctpClient = sctpClient;
        this.keynodes = keynodes;
    }

    /**
     * Register this agent to a specified event
     * addr - ScAddr of sc-element to subscribe event
     * evtType - on of ScPythonEventType values (type of event)
     */
    register(addr, evtType) {
        return this.sctpClient.EventCreate(evtType, addr, this._run)
            .done(id => this.eventId = id)
    }

    unregister() {
        if (this.eventId) {
            this.sctpClient.EventDestroy()
        } else {
            throw new Error("Agent hasn't be registered")
        }
    }

    /**
     * Should be override and do agent logic.
     * It should return one of ScAgent.Status values
     * evt - ScEventParams instance
     */
    runImpl(evt) {
        throw new Error("should be overrided");
    }

    /**
     * If this function returns True, then RunImpl should be called;
     * potherwise it woudn't be
     * @param evt
     */
    checkImpl(evt) {
        return true;
    }

    _run(evt) {
        if (this.checkImpl(evt)) {
            this.runImpl(evt)
        }
    }
}
/**
 * This type of agents initiated with command_initiated set.
 * It check if initiated command class is equal to specified one,
 * then run it. You doesn't need to call register function for this
 * type of agents
 */
export class ScAgentCommand extends ScAgent {
    constructor(sctpClient, keynodes, cmdClassAddr) {
        super(sctpClient, keynodes);
        this.cmdClassAddr = cmdClassAddr;
    }

    async  register() {
        const {commandInitiated} = this.keynodes.ResolveKeynodes(['command_initiated'])
        return super.register(commandInitiated, SctpEventType.ADD_OUTPUT_EDGE)
    }
}
