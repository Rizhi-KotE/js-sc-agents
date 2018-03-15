export default class SctpClientOnPromises extends SctpClient {

    check_element() {
        return new Promise((success, fail) => super.check_element.apply(this, arguments).then(success, fail));
    }

    create_node() {
        return new Promise((success, fail) => super.create_node.apply(this, arguments).then(success, fail));
    }

    create_arc() {
        return new Promise((success, fail) => super.create_arc.apply(this, arguments).then(success, fail));
    }

    create_link() {
        return new Promise((success, fail) => super.create_link.apply(this, arguments).then(success, fail));
    }

    set_link_content() {
        return new Promise((success, fail) => super.set_link_content.apply(this, arguments).then(success, fail));
    }

    get_link_content() {
        return new Promise((success, fail) => super.get_link_content.apply(this, arguments).then(success, fail));
    }

    event_emit() {
        return new Promise((success, fail) => super.event_emit.apply(this, arguments).then(success, fail))
            .then(console.log.bind(undefined, "Event "));
    }

    iterate_elements() {
        return new Promise((success, fail) => super.iterate_elements.apply(this, arguments).then(success, fail));
    }

    iterate_constr() {
        return new Promise((success, fail) => super.iterate_constr.apply(this, arguments).then(success, fail));
    }

    find_element_by_system_identifier() {
        return new Promise((success, fail) => super.find_element_by_system_identifier.apply(this, arguments).then(success, fail));
    }

    event_create() {
        return new Promise((success, fail) => super.event_create.apply(this, arguments).then(success, fail));
    }

    event_destro() {
        return new Promise((success, fail) => super.event_destro.apply(this, arguments).then(success, fail));
    }

    erase_element() {
        return new Promise((success, fail) => super.erase_element.apply(this, arguments).then(success, fail))
    };

    get_element_type() {
        return new Promise((success, fail) => super.get_element_type.apply(this, arguments).then(success, fail));
    }

    get_arc() {
        return new Promise((success, fail) => super.get_arc.apply(this, arguments).then(success, fail));
    }
}

