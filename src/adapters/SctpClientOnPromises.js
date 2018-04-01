import * as R from "ramda";

export default class SctpClientOnPromises {
    constructor(sctpClientPromise){
        
        this.sctpClientPromise = sctpClientPromise;
    }

    async check_element() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.check_element.apply(sctpClient, arguments).then(success, fail));
    }

    async create_node() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.create_node.apply(sctpClient, arguments).then(success, fail));
    }

    async create_arc() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.create_arc.apply(sctpClient, arguments).then(success, fail));
    }

    async create_link() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.create_link.apply(sctpClient, arguments).then(success, fail));
    }

    async set_link_content() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.set_link_content.apply(sctpClient, arguments).then(success, fail));
    }

    async get_link_content() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.get_link_content.apply(sctpClient, arguments).then(success, fail));
    }

    async event_emit() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.event_emit.apply(sctpClient, arguments).then(success, fail))
            .then(console.log.bind(undefined, "Event "));
    }

    async iterate_elements() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.iterate_elements.apply(sctpClient, arguments).then(success, fail));
    }

    async iterate_constr() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.iterate_constr.apply(sctpClient, arguments).then(success, fail));
    }

    async find_element_by_system_identifier() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.find_element_by_system_identifier.apply(sctpClient, arguments).then(success, fail));
    }

    async event_create() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.event_create.apply(sctpClient, arguments).then(success, fail));
    }

    async event_destro() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.event_destro.apply(sctpClient, arguments).then(success, fail));
    }

    async erase_element() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.erase_element.apply(sctpClient, arguments).then(success, fail))
    };

    async get_element_type() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.get_element_type.apply(sctpClient, arguments).then(success, fail));
    }

    async get_arc() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.get_arc.apply(sctpClient, arguments).then(success, fail));
    }

    async close() {
        const sctpClient = await this.sctpClientPromise;
        return sctpClient.socket.close();
    }
}

