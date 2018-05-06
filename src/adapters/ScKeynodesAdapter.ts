export interface ScKeynodes {

    resolveArrayOfKeynodes(sysIdtfs: string[]): Promise<Map<string, number>>;
    resolveKeynode(sysIdtf: string, property?: string): Promise<number>;
    getSysIdtfByAddress(scAddr: number): Promise<string>;
}

export class ScKeynodesAdapter implements ScKeynodes {
    private scKeynodesPromise;

    constructor(sctpClientPromise) {
        this.scKeynodesPromise = sctpClientPromise
            .then(sctpClient => new (window as any).SCWeb.ScKeynodes(sctpClient));
    }

    async resolveArrayOfKeynodes(sysIdtfs: string[]): Promise<Map<string, number>> {
        const scKeynodes = await this.scKeynodesPromise;
        return scKeynodes.resolveArrayOfKeynodes(sysIdtfs);
    }


    async resolveKeynode(sysIdtf: string, property: string): Promise<number> {
        const scKeynodes = await this.scKeynodesPromise;
        return scKeynodes.resolveKeynode(sysIdtf, property);
    }

    async getSysIdtfByAddress(scAddr: number): Promise<string> {
        const scKeynodes = await this.scKeynodesPromise;
        return scKeynodes.getSysIdtfByAddress(scAddr);
    }
}