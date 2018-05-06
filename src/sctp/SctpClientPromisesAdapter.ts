// import {SctpClient} from "SCWeb";
import {SctpContrIterationResult} from "./ScTypes";


export function createSctpClientAdapter(url: string): SctpClient {
    const sctpClientPromise: Promise<SctpClient> = new Promise((success, fail) => {
        const sctpClient = new (window as any).SctpClient({
            onError: fail, onConnect: function () {
                success(sctpClient as SctpClient);
            }
        });
        sctpClient.connect(url);
    });
    return new SctpClientOnPromises(sctpClientPromise);
}

export interface SctpClient {
    check_element(addr: number): Promise<any>
    create_node(type: number): Promise<number>
    create_arc(type: number, src: number, trg: number): Promise<any>
    create_link(): Promise<number>
    set_link_content(addr: number, data: number | string | ArrayBuffer): Promise<any>
    get_link_content(addr: number, type: "string" | "binary" | "int" | "float"): Promise<any>
    event_emit()
    iterate_elements(iterator_type: number, args: Array<number>): Promise<number[][]>
    iterate_constr(...iterators: Array<any>): Promise<SctpContrIterationResult>
    find_element_by_system_identifier(data: string): Promise<number>
    event_create(evt_type: number, addr: number, callback: (target: number, attr: number) => void): Promise<number>
    event_destroy(evt_id: number): Promise<void>
    erase_element(addr: number): Promise<void>
    get_element_type(addr: number): Promise<number>
    get_arc(arc: number): Promise<[number, number]>
    close()
}

export default class SctpClientOnPromises implements SctpClient {
    private sctpClientPromise;

    constructor(sctpClientPromise) {

        this.sctpClientPromise = sctpClientPromise;
    }

    async _check() {
        return this.sctpClientPromise;
    }

    async check_element(addr: number) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.check_element(addr).then(success, fail));
    }

    async create_node(type: number) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.create_node(type).then(success, fail));
    }

    async create_arc(type: number, src: number, trg: number): Promise<any> {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.create_arc(type, src, trg).then(success, fail));
    }

    async create_link() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.create_link().then(success, fail));
    }

    async set_link_content(addr: number, data: number | string | ArrayBuffer) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.set_link_content(addr, data).then(success, fail));
    }

    async get_link_content(addr: number, type: "string" | "binary" | "int" | "float") {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.get_link_content(addr, type).then(success, fail));
    }

    async event_emit() {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.event_emit().then(success, fail))
            .then(console.log.bind(undefined, "Event "));
    }

    async iterate_elements(iterator_type: number, args: Array<number>) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.iterate_elements(iterator_type, args).then(success, fail));
    }

    async iterate_constr(...iterators: Array<any>) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.iterate_constr.apply(sctpClient, iterators).then(success, fail));
    }

    async find_element_by_system_identifier(data: string) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.find_element_by_system_identifier(data).then(success, fail));
    }

    async event_create(evt_type: number, addr: number, callback: (target: number, attr: number) => void) {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.event_create(evt_type, addr, callback).then(success, fail));
    }

    async event_destroy(evt_id: number): Promise<void> {
        const sctpClient = await this.sctpClientPromise;
        await new Promise((success, fail) => sctpClient.event_destroy(evt_id).then(success, fail));
    }

    async erase_element(addr: number): Promise<void> {
        const sctpClient = await this.sctpClientPromise;
        await new Promise((success, fail) => sctpClient.erase_element(addr).then(success, fail))
    };

    async get_element_type(addr: number): Promise<number> {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.get_element_type(addr).then(success, fail)) as Promise<number>;
    }

    async get_arc(arc: number): Promise<[number, number]> {
        const sctpClient = await this.sctpClientPromise;
        return new Promise((success, fail) => sctpClient.get_arc(arc).then(success, fail)) as Promise<[number, number]>;
    }

    async close() {
        const sctpClient = await this.sctpClientPromise;
        return sctpClient.socket.close();
    }
}
