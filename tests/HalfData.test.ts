import Vertex from '#/Vertex';
import Half from '#/Half';
import VertexData from '#/VertexData';
import HalfData from '#/HalfData';

describe.skip('HalfData', ():void => {
	test('instance', ():void => {
		const hData = new HalfData();

		expect(hData).not.toBeNull();
		expect(hData.length).toBe(0);
		expect(hData.first).toBeNull();
	});
	test('make', ():void => {
		const hData = new HalfData();
		const vData = new VertexData();

		vData.make();
		const id01 = hData.make(vData.first as Vertex);

		expect(id01).not.toBe(-1);
		expect(hData.length).toBe(1);
		expect(hData.first).not.toBeNull();

		const h = hData.getHalf(id01);
		expect(h).not.toBeNull();
		expect((h as Half).vertex).toEqual(vData.first);
	});
	test('delete', ():void => {
		const hData = new HalfData();
		const vData = new VertexData();

		vData.make();
		const id01 = hData.make(vData.first as Vertex);
		const h = hData.getHalf(id01) as Half;

		expect(hData.length).toBe(1);

		expect(hData.delete(h)).toBeTruthy();

		expect(hData.length).toBe(0);
		expect(hData.first).toBeNull();
	});
	test('delete failed', ():void => {
		const hData = new HalfData();
		const vData = new VertexData();

		vData.make();
		const id01 = hData.make(vData.first as Vertex);
		const h = hData.getHalf(id01);

		expect(hData.length).toBe(1);

		const vID = vData.make();
		const dh = new Half(999, vData.getVertex(vID) as Vertex);

		expect(hData.delete(dh)).toBeFalsy();

		expect(hData.length).toBe(1);
		expect(hData.first).toEqual(h);
	});
	test('value exist', ():void => {
		throw new Error('Not implemented yet.')
	});
	test('connection', ():void => {
		throw new Error('Not implemented yet.')
	});
});
