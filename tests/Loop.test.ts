import Vertex from '#/Vertex';
import Half from '#/Half';
import Loop from '#/Loop';

describe('Loop', (): void => {
	test('create instance', (): void => {
		const v01 = new Vertex(0);
		const v02 = new Vertex(1);
		const v03 = new Vertex(2);
		const v04 = new Vertex(3);

		const h01 = new Half(0, v01);
		const h02 = new Half(1, v02);
		const h03 = new Half(2, v03);
		const h04 = new Half(3, v04);

		h01['setNextHalf'](h02);
		h02['setNextHalf'](h03);
		h03['setNextHalf'](h04);
		h04['setNextHalf'](h01);

		const halfs = [h01, h02, h03, h04];

		const test_id = Math.round(Math.random() * 10000);
		const l = new Loop(test_id, halfs);

		expect(l).not.toBeNull();

		expect(l.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(l.id).toEqual(test_id);

		expect(l.halfs).toEqual(halfs);
		expect(l.numberOfCorner).toBe(4);
		expect(l.isTriangle).toBeFalsy();
		expect(l.isQuadrangle).toBeTruthy();
	});
	test('create triangle', (): void => {
		const v01 = new Vertex(0);
		const v02 = new Vertex(1);
		const v03 = new Vertex(2);

		const h01 = new Half(0, v01);
		const h02 = new Half(1, v02);
		const h03 = new Half(2, v03);

		h01['setPrevHalf'](h03);
		h02['setPrevHalf'](h01);
		h03['setPrevHalf'](h02);

		const halfs = [h01, h02, h03];

		const test_id = Math.round(Math.random() * 10000);
		const l = new Loop(test_id, halfs);

		expect(l).not.toBeNull();

		expect(l.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(l.id).toEqual(test_id);

		expect(l.halfs).toEqual(halfs);
		expect(l.numberOfCorner).toBe(3);
		expect(l.isTriangle).toBeTruthy();
		expect(l.isQuadrangle).toBeFalsy();
	});
	test('create instance failed', (): void => {
		const v01 = new Vertex(0);
		const v02 = new Vertex(1);

		const h01 = new Half(0, v01);
		const h02 = new Half(1, v02);

		const test_id = Math.round(Math.random() * 10000);
		expect(() => {new Loop(test_id, [h01, h02])}).toThrow();
	});
	test('Argument over 4', ():void => {
		const v01 = new Vertex(0);
		const v02 = new Vertex(1);
		const v03 = new Vertex(2);
		const v04 = new Vertex(3);
		const v05 = new Vertex(4);

		const h01 = new Half(0, v01);
		const h02 = new Half(1, v02);
		const h03 = new Half(2, v03);
		const h04 = new Half(3, v04);
		const h05 = new Half(3, v05);

		h01['setNextHalf'](h02);
		h02['setNextHalf'](h03);
		h03['setNextHalf'](h04);
		h04['setNextHalf'](h05);
		h05['setNextHalf'](h01);

		const halfs = [h01, h02, h03, h04, h05];

		const test_id = Math.round(Math.random() * 10000);
		expect(() => {new Loop(test_id, halfs)}).toThrow();
	});
});

