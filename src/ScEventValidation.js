import * as R from "ramda";
import {scKeynodes} from "./service/scKeynodes";

/**
 * sys-id - of event type
 * sctp-code - of event type
 */
const eventTypes = {
    sc_event_add_output_arc: 0,
    sc_event_add_input_arc: 1,
    sc_event_remove_output_arc: 2,
    sc_event_remove_input_arc: 3,
    sc_event_remove_element: 4,
    sc_event_change_link_content: 5
};

function _selectKeys(keys, object) {
    const selectors = R.map(R.prop, keys);
    const selecrot = R.juxt(selectors);
    return R.zipObj(selecrot(object), keys);
}

async function _eventTypeAddrs(){

    const eventTypeSysIds = Object.keys(eventTypes);
    const keynodes = await scKeynodes.resolveArrayOfKeynodes(eventTypeSysIds);
    return _selectKeys(eventTypeSysIds, keynodes);
}

export default class ScEventTypeUtils {

    /**
     * scAddr -> sctp_event code, used in protocol
     * @returns {Promise.<void>}
     */
    async getSctpEventType(eventAddr) {
        const eventTypeAddrs = await _eventTypeAddrs();
        const eventTypeSysId = eventTypeAddrs[eventAddr];
        const eventTypeSctpCode = eventTypes[eventTypeSysId];
        return eventTypeSctpCode;
    }

    async isEventType(eventAddr) {
        const eventTypeAddrs = await _eventTypeAddrs();
        return eventTypeAddrs[eventAddr];
    }
}
