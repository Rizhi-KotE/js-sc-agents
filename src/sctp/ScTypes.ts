// sc-element types
export const sc_type_node: number = 0x1;
export const sc_type_link: number = 0x2;
export const sc_type_edge_common: number = 0x4;
export const sc_type_arc_common: number = 0x8;
export const sc_type_arc_access: number = 0x10;
// sc-element constant
export const sc_type_const: number = 0x20;
export const sc_type_var: number = 0x40;
// sc-element positivity
export const sc_type_arc_pos: number = 0x80;
export const sc_type_arc_neg: number = 0x100;
export const sc_type_arc_fuz: number = 0x200;
// sc-element premanently
export const sc_type_arc_temp: number = 0x400;
export const sc_type_arc_perm: number = 0x800;
// struct node types
export const sc_type_node_tuple: number = 0x80;
export const sc_type_node_struct: number = (0x100);
export const sc_type_node_role: number = (0x200);
export const sc_type_node_norole: number = (0x400);
export const sc_type_node_class: number = (0x800);
export const sc_type_node_abstract: number = (0x1000);
export const sc_type_node_material: number = (0x2000);
export const sc_type_arc_pos_const_perm: number = (sc_type_arc_access | sc_type_const | sc_type_arc_pos | sc_type_arc_perm);
// type mask
export const sc_type_element_mask: number = (sc_type_node | sc_type_link | sc_type_edge_common | sc_type_arc_common | sc_type_arc_access);
export const sc_type_constancy_mask: number = (sc_type_const | sc_type_var);
export const sc_type_positivity_mask: number = (sc_type_arc_pos | sc_type_arc_neg | sc_type_arc_fuz);
export const sc_type_permanency_mask: number = (sc_type_arc_perm | sc_type_arc_temp);
export const sc_type_node_struct_mask: number = (sc_type_node_tuple | sc_type_node_struct | sc_type_node_role | sc_type_node_norole | sc_type_node_class | sc_type_node_abstract | sc_type_node_material);
export const sc_type_arc_mask: number = (sc_type_arc_access | sc_type_arc_common | sc_type_edge_common);

export const SctpCommandType = {
    SCTP_CMD_UNKNOWN: 0x00, // unkown command
    SCTP_CMD_CHECK_ELEMENT: 0x01, // check if specified sc-element exist
    SCTP_CMD_GET_ELEMENT_TYPE: 0x02, // return sc-element type
    SCTP_CMD_ERASE_ELEMENT: 0x03, // erase specified sc-element
    SCTP_CMD_CREATE_NODE: 0x04, // create new sc-node
    SCTP_CMD_CREATE_LINK: 0x05, // create new sc-link
    SCTP_CMD_CREATE_ARC: 0x06, // create new sc-arc
    SCTP_CMD_GET_ARC: 0x07, // return begin element of sc-arc

    SCTP_CMD_GET_LINK_CONTENT: 0x09, // return content of sc-link
    SCTP_CMD_FIND_LINKS: 0x0a, // return sc-links with specified content
    SCTP_CMD_SET_LINK_CONTENT: 0x0b, // setup new content for the link

    SCTP_CMD_ITERATE_ELEMENTS: 0x0c, // return base template iteration result
    SCTP_CMD_ITERATE_CONSTRUCTION: 0x0d, // return advanced template iteration (batch of base templates)

    SCTP_CMD_EVENT_CREATE: 0x0e, // create subscription to specified event
    SCTP_CMD_EVENT_DESTROY: 0x0f, // destroys specified event subscription
    SCTP_CMD_EVENT_EMIT: 0x10, // emits events to client

    SCTP_CMD_FIND_ELEMENT_BY_SYSITDF: 0xa0, // return sc-element by it system identifier
    SCTP_CMD_SET_SYSIDTF: 0xa1, // setup new system identifier for sc-element
    SCTP_CMD_STATISTICS: 0xa2, // return usage statistics from server
};


export const SctpResultCode = {
    SCTP_RESULT_OK: 0x00,
    SCTP_RESULT_FAIL: 0x01,
    SCTP_RESULT_ERROR_NO_ELEMENT: 0x02 // sc-element wasn't founded
};


export const SctpIteratorType = {
    SCTP_ITERATOR_3F_A_A: 0,
    SCTP_ITERATOR_3A_A_F: 1,
    SCTP_ITERATOR_3F_A_F: 2,
    SCTP_ITERATOR_5F_A_A_A_F: 3,
    SCTP_ITERATOR_5A_A_F_A_F: 4,
    SCTP_ITERATOR_5F_A_F_A_F: 5,
    SCTP_ITERATOR_5F_A_F_A_A: 6,
    SCTP_ITERATOR_5F_A_A_A_A: 7,
    SCTP_ITERATOR_5A_A_F_A_A: 8
};

export const SctpEventType = {
    SC_EVENT_UNKNOWN: -1,
    SC_EVENT_ADD_OUTPUT_ARC: 0,
    SC_EVENT_ADD_INPUT_ARC: 1,
    SC_EVENT_REMOVE_OUTPUT_ARC: 2,
    SC_EVENT_REMOVE_INPUT_ARC: 3,
    SC_EVENT_REMOVE_ELEMENT: 4
};

export type SctpConstrIter = {
    iterator_type: number,
    args: (string | number)[],
    mappings: Object
}

export function SctpConstrIter(iterator_type: number, args: Array<(string | number)>, resMappings: Object) {
    return {
        iterator_type: iterator_type,
        args: args,
        mappings: resMappings
    };
}

export interface SctpContrIterationResult {
    results: number[][]
    exist: () => boolean
    get: (idx: number, name: string) => number
}

export type ScTriple = [number, number, number];
