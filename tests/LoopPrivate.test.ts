import VertexPrivate from '#/VertexPrivate';
import HalfPrivate from '#/HalfPrivate';
import LoopPrivate from '#/LoopPrivate';

describe('LoopPrivate', (): void => {
	test('create instance', (): void => {
		const v01 = new VertexPrivate(0);
		const v02 = new VertexPrivate(1);
		const v03 = new VertexPrivate(2);
		const v04 = new VertexPrivate(3);

		const h01 = new HalfPrivate(0, v01);
		const h02 = new HalfPrivate(1, v02);
		const h03 = new HalfPrivate(2, v03);
		const h04 = new HalfPrivate(3, v04);

		h01.prev = h04;
		h01.next = h02;

		h02.prev = h01;
		h02.next = h03;

		h03.prev = h02;
		h03.next = h04;

		h04.prev = h03;
		h04.next = h01;

		const halfs = [h01, h02, h03, h04];

		const test_id = Math.round(Math.random() * 10000);
		const l = new LoopPrivate(test_id, halfs);

		expect(l).not.toBeNull();

		expect(l.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(l.id).toEqual(test_id);

		expect(l.halfs).toEqual(halfs);
		expect(l.numberOfCorner).toBe(4);
		expect(l.isTriangle).toBeFalsy();
		expect(l.isQuadrangle).toBeTruthy();
	});
	test('create triangle', (): void => {
		const v01 = new VertexPrivate(0);
		const v02 = new VertexPrivate(1);
		const v03 = new VertexPrivate(2);

		const h01 = new HalfPrivate(0, v01);
		const h02 = new HalfPrivate(1, v02);
		const h03 = new HalfPrivate(2, v03);

		h01.prev = h03;
		h01.next = h02;

		h02.prev = h01;
		h02.next = h03;

		h03.prev = h02;
		h03.next = h01;

		const halfs = [h01, h02, h03];

		const test_id = Math.round(Math.random() * 10000);
		const l = new LoopPrivate(test_id, halfs);

		expect(l).not.toBeNull();

		expect(l.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(l.id).toEqual(test_id);

		expect(l.halfs).toEqual(halfs);
		expect(l.numberOfCorner).toBe(3);
		expect(l.isTriangle).toBeTruthy();
		expect(l.isQuadrangle).toBeFalsy();
	});
	test('create instance failed', (): void => {
		const v01 = new VertexPrivate(0);
		const v02 = new VertexPrivate(1);

		const h01 = new HalfPrivate(0, v01);
		const h02 = new HalfPrivate(1, v02);

		const test_id = Math.round(Math.random() * 10000);
		expect(() => {new LoopPrivate(test_id, [h01, h02])}).toThrow();
	});
	test('Argument over 4', ():void => {
		const v01 = new VertexPrivate(0);
		const v02 = new VertexPrivate(1);
		const v03 = new VertexPrivate(2);
		const v04 = new VertexPrivate(3);
		const v05 = new VertexPrivate(4);

		const h01 = new HalfPrivate(0, v01);
		const h02 = new HalfPrivate(1, v02);
		const h03 = new HalfPrivate(2, v03);
		const h04 = new HalfPrivate(3, v04);
		const h05 = new HalfPrivate(3, v05);

		h01.prev = h05;
		h01.next = h02;

		h02.prev = h01;
		h02.next = h03;

		h03.prev = h02;
		h03.next = h04;

		h04.prev = h03;
		h04.next = h05;

		h05.prev = h04;
		h05.next = h01;

		const halfs = [h01, h02, h03, h04, h05];

		const test_id = Math.round(Math.random() * 10000);
		const l = new LoopPrivate(test_id, halfs);

		expect(l).not.toBeNull();

		expect(l.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(l.id).toEqual(test_id);

		expect(l.halfs).toEqual(halfs.slice(0, 4));
		expect(l.numberOfCorner).toBe(4);
		expect(l.isTriangle).toBeFalsy();
		expect(l.isQuadrangle).toBeTruthy();
	});
});

