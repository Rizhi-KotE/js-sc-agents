import {SctpContrIterationResult} from "./ScTypes";

export function selectColumns(keys: string[], rs: SctpContrIterationResult): Map<string, number[]> {
    const table = new Map<string, number[]>();
    for (let key of keys) {
        table[key] = rs.results.map((arr, idx) => rs.get(idx, key));
    }
    return table;
}
