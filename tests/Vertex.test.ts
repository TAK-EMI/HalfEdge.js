import Vertex from '#/Vertex';
import Half from '#/Half';

describe('Vertex', (): void => {
	test(`create instance success`, (): void => {
		const test_id = Math.round(Math.random() * 10000);
		const test_pos = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];

		const v = new Vertex(test_id, test_pos);
		expect(v).not.toBeNull();

		expect(v.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(v.id).toEqual(test_id);
		expect(v.position).toEqual(test_pos);
		expect(v.halfs).toEqual([]);
	});
	test('Omit argument', (): void => {
		const test_id = Math.round(Math.random() * 10000);
		const v = new Vertex(test_id);

		expect(v).not.toBeNull();

		expect(v.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(v.id).toEqual(test_id);
		expect(v.position).toEqual([0.0, 0.0, 0.0]);
	});
	test('create instance failed', (): void => {
		const test_id = Math.round(Math.random() * 10000);
		const test_pos = [Math.random() * 10000, Math.random() * 10000];

		expect(() => {new Vertex(test_id, test_pos)}).toThrow('Argument array size is should be 3.');
	});
	test('half operation', ():void => {
		const v01 = new Vertex(0);
		const v02 = new Vertex(1);
		const v03 = new Vertex(2);

		const h01 = new Half(0, v01);
		const h02 = new Half(1, v02);
		const h03 = new Half(2, v03);
		const h04 = new Half(3, v01);

		expect(h01.vertex).toEqual(v01);
		expect(h02.vertex).toEqual(v02);
		expect(h03.vertex).toEqual(v03);
		expect(h04.vertex).toEqual(v01);

		expect(v01.existHalf(h01)).toBeTruthy();
		expect(v01.existHalf(h04)).toBeTruthy();
		expect(v02.existHalf(h02)).toBeTruthy();
		expect(v03.existHalf(h03)).toBeTruthy();

		expect(v01['addHalf'](h02)).toBeFalsy();
		expect(v01['addHalf'](h04)).toBeFalsy();

		expect(v01['deleteHalf'](h04)).toBeTruthy();
		expect(v01.existHalf(h04)).toBeFalsy();
	});
})

