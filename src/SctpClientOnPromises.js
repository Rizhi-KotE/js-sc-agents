export default class SctpClientOnPromises extends SctpClient {

    create_arc(type, src, trg) {
        return new Promise((success, fail) => super.create_arc(type, src, trg)
            .done(success, fail))
    }

    event_create(evt_type, addr, callback){
        return new Promise((success, fail) => super.event_create(evt_type, addr, callback)
            .done(success, fail))
    }
}

