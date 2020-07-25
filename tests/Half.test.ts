import Vertex from '#/Vertex';
import Half from '#/Half';

describe('Half', (): void => {
	test('create instance', (): void => {
		const test_vert_id = Math.round(Math.random() * 10000);
		const test_pos = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];

		const v = new Vertex(test_vert_id, test_pos);

		const test_half_id = Math.round(Math.random() * 10000);
		const h = new Half(test_half_id, v);

		expect(h).not.toBeNull();

		expect(h.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(h.id).toEqual(test_half_id);

		expect(v.existHalf(h)).toBeTruthy();

		expect(h.edge).toBeNull();
		expect(h.loop).toBeNull();
		expect(h.prev).toBeNull();
		expect(h.next).toBeNull();

		expect(h.vertex).toEqual(v);
	});
});
