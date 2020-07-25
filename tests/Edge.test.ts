import Vertex from '#/Vertex';
import Half from '#/Half';
import Edge from '#/Edge';

describe('Edge', (): void => {
	test('create instance', (): void => {
		const test_vert_id01 = Math.round(Math.random() * 10000);
		const test_vert_id02 = Math.round(Math.random() * 10000);
		const test_vert_id03 = Math.round(Math.random() * 10000);
		const v01 = new Vertex(test_vert_id01);
		const v02 = new Vertex(test_vert_id02);
		const v03 = new Vertex(test_vert_id03);

		const test_half_id01 = Math.round(Math.random() * 10000);
		const test_half_id02 = Math.round(Math.random() * 10000);
		const test_half_id03 = Math.round(Math.random() * 10000);
		const h01 = new Half(test_half_id01, v01);
		const h02 = new Half(test_half_id02, v02);
		const h03 = new Half(test_half_id03, v03);

		const test_edge_id = Math.round(Math.random() * 10000);
		const e = new Edge(test_edge_id, h01, h02);
		expect(e).not.toBeNull();

		expect(e.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(e.id).toEqual(test_edge_id);

		expect(e.first).toEqual(h01);
		expect(e.second).toEqual(h02);

		expect(e.existHalf(h01)).toBeTruthy();
		expect(e.existHalf(h02)).toBeTruthy();
		expect(e.existHalf(h03)).toBeFalsy();
	});
});

