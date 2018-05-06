// sc-element types
export var sc_type_node = 0x1;
export var sc_type_link = 0x2;
export var sc_type_edge_common = 0x4;
export var sc_type_arc_common = 0x8;
export var sc_type_arc_access = 0x10;
// sc-element constant
export var sc_type_const = 0x20;
export var sc_type_var = 0x40;
// sc-element positivity
export var sc_type_arc_pos = 0x80;
export var sc_type_arc_neg = 0x100;
export var sc_type_arc_fuz = 0x200;
// sc-element premanently
export var sc_type_arc_temp = 0x400;
export var sc_type_arc_perm = 0x800;
// struct node types
export var sc_type_node_tuple = 0x80;
export var sc_type_node_struct = (0x100);
export var sc_type_node_role = (0x200);
export var sc_type_node_norole = (0x400);
export var sc_type_node_class = (0x800);
export var sc_type_node_abstract = (0x1000);
export var sc_type_node_material = (0x2000);
export var sc_type_arc_pos_const_perm = (sc_type_arc_access | sc_type_const | sc_type_arc_pos | sc_type_arc_perm);
// type mask
export var sc_type_element_mask = (sc_type_node | sc_type_link | sc_type_edge_common | sc_type_arc_common | sc_type_arc_access);
export var sc_type_constancy_mask = (sc_type_const | sc_type_var);
export var sc_type_positivity_mask = (sc_type_arc_pos | sc_type_arc_neg | sc_type_arc_fuz);
export var sc_type_permanency_mask = (sc_type_arc_perm | sc_type_arc_temp);
export var sc_type_node_struct_mask = (sc_type_node_tuple | sc_type_node_struct | sc_type_node_role | sc_type_node_norole | sc_type_node_class | sc_type_node_abstract | sc_type_node_material);
export var sc_type_arc_mask = (sc_type_arc_access | sc_type_arc_common | sc_type_edge_common);
export var SctpCommandType = {
    SCTP_CMD_UNKNOWN: 0x00,
    SCTP_CMD_CHECK_ELEMENT: 0x01,
    SCTP_CMD_GET_ELEMENT_TYPE: 0x02,
    SCTP_CMD_ERASE_ELEMENT: 0x03,
    SCTP_CMD_CREATE_NODE: 0x04,
    SCTP_CMD_CREATE_LINK: 0x05,
    SCTP_CMD_CREATE_ARC: 0x06,
    SCTP_CMD_GET_ARC: 0x07,
    SCTP_CMD_GET_LINK_CONTENT: 0x09,
    SCTP_CMD_FIND_LINKS: 0x0a,
    SCTP_CMD_SET_LINK_CONTENT: 0x0b,
    SCTP_CMD_ITERATE_ELEMENTS: 0x0c,
    SCTP_CMD_ITERATE_CONSTRUCTION: 0x0d,
    SCTP_CMD_EVENT_CREATE: 0x0e,
    SCTP_CMD_EVENT_DESTROY: 0x0f,
    SCTP_CMD_EVENT_EMIT: 0x10,
    SCTP_CMD_FIND_ELEMENT_BY_SYSITDF: 0xa0,
    SCTP_CMD_SET_SYSIDTF: 0xa1,
    SCTP_CMD_STATISTICS: 0xa2,
};
export var SctpResultCode = {
    SCTP_RESULT_OK: 0x00,
    SCTP_RESULT_FAIL: 0x01,
    SCTP_RESULT_ERROR_NO_ELEMENT: 0x02 // sc-element wasn't founded
};
export var SctpIteratorType = {
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
export var SctpEventType = {
    SC_EVENT_UNKNOWN: -1,
    SC_EVENT_ADD_OUTPUT_ARC: 0,
    SC_EVENT_ADD_INPUT_ARC: 1,
    SC_EVENT_REMOVE_OUTPUT_ARC: 2,
    SC_EVENT_REMOVE_INPUT_ARC: 3,
    SC_EVENT_REMOVE_ELEMENT: 4
};
export function SctpConstrIter(iterator_type, args, resMappings) {
    return {
        iterator_type: iterator_type,
        args: args,
        mappings: resMappings
    };
}
