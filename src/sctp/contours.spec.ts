import {createSctpClientAdapter, SctpClient} from "./SctpClientPromisesAdapter";
import {getElementTypeInit, loadContourTriples as loadContourTriplesWithClient} from "./contours";
import {sc_type_arc_access, sc_type_edge_common, sc_type_link, sc_type_node, SctpConstrIter, ScTriple} from "./ScTypes";
import * as R from "ramda";


describe("Test sc utils", function () {
    let sctpClient: SctpClient = null;
    let loadContourTriples: (addr: number) => Promise<ScTriple[]> = null;
    beforeAll(function () {
        sctpClient = createSctpClientAdapter("ws://localhost:8000/sctp");
        loadContourTriples = loadContourTriplesWithClient.bind(null, sctpClient);
    });


    afterAll(function () {
        sctpClient.close();
    });

    describe("load contour as triples", function () {
        it("load PFC_NON_TERMINAL_CONTOUR shoud get 3 triples", async function () {
            const contourAddr = await sctpClient.find_element_by_system_identifier("PFC_NON_TERMINAL_CONTOUR");
            expect(contourAddr).toBeDefined();

            const triples: [number, number, number][] = await loadContourTriples(contourAddr);

            expect(triples.length).toBe(3);
            expect(triples).not.toContain(null);
        });

        it("load test_contour_2_triples shoud get 3 triples", async function () {

            const contourAddr = await sctpClient.find_element_by_system_identifier("test_contour_2_triples");
            expect(contourAddr).toBeDefined();

            const triples: [number, number, number][] = await loadContourTriples(contourAddr);

            expect(triples.length).toBe(2);
            expect(triples).not.toContain(null);
        });
    });

    describe("load types", function () {
        it("check elements types", async function () {
            const typeNode = await sctpClient.find_element_by_system_identifier("elem_sc_type_node");
            const typeLink = await sctpClient.find_element_by_system_identifier("elem_sc_type_link");
            const edgeCommon = await sctpClient.find_element_by_system_identifier("elem_sc_type_edge_common");
            const arcCommon = await sctpClient.find_element_by_system_identifier("elem_sc_type_arc_common");
            const arcAccess = await sctpClient.find_element_by_system_identifier("elem_sc_type_arc_access");

            expect(await sctpClient.get_element_type(typeNode) & sc_type_node).toBe(sc_type_node);
            expect(await sctpClient.get_element_type(typeLink) & sc_type_link).toBe(sc_type_link);
            expect(await sctpClient.get_element_type(edgeCommon) & sc_type_edge_common).toBe(sc_type_edge_common);
            // expect(await sctpClient.get_element_type(arcCommon) & sc_type_arc_common).toBe(sc_type_arc_common);
            // expect(await sctpClient.get_element_type(arcCommon) & sc_type_edge_common).toBe(sc_type_edge_common);
            expect(await sctpClient.get_element_type(arcAccess) & sc_type_arc_access).toBe(sc_type_arc_access);
        });

        it("get syncron version of get_element_type function", async function () {
            const typeNode = await sctpClient.find_element_by_system_identifier("elem_sc_type_node");
            const typeLink = await sctpClient.find_element_by_system_identifier("elem_sc_type_link");
            const edgeCommon = await sctpClient.find_element_by_system_identifier("elem_sc_type_edge_common");
            const arcCommon = await sctpClient.find_element_by_system_identifier("elem_sc_type_arc_common");
            const arcAccess = await sctpClient.find_element_by_system_identifier("elem_sc_type_arc_access");
            const addreses = [typeNode, typeLink, edgeCommon, arcCommon, arcAccess];
            const getElementType: (addr: number) => number = await getElementTypeInit(sctpClient, addreses);

            expect(getElementType(typeNode) & sc_type_node).toBe(sc_type_node);
            expect(getElementType(typeLink) & sc_type_link).toBe(sc_type_link);
            expect(getElementType(edgeCommon) & sc_type_edge_common).toBe(sc_type_edge_common);
            // expect(getElementType(arcCommon) & sc_type_arc_common).toBe(sc_type_arc_common);
            expect(getElementType(arcAccess) & sc_type_arc_access).toBe(sc_type_arc_access);

            const unresolvedElement = 666;
            expect(() => getElementType(unresolvedElement))
                .toThrow("Element was not resolved [addr=666]")
        })
    });

});
