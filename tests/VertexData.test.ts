import VertexData from '#/VertexData';
import Vertex from '#/Vertex';

describe.skip('VertexData', (): void => {
	test('instance', (): void => {
		const vData = new VertexData();

		expect(vData).not.toBeNull();
		expect(vData.length).toBe(0);
		expect(vData.first).toBeNull();
	});
	test('make vertex', ():void => {
		const vData = new VertexData();

		const test_pos01 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos02 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];

		const id01 = vData.make(test_pos01);
		expect(id01).not.toBe(-1);
		expect(vData.length).toBe(1);

		expect(vData['values'][0].id).toEqual(id01);
		expect((vData['values'][0] as Vertex).position).toEqual(test_pos01);

		const id02 = vData.make(test_pos02);
		expect(id02).toBe(id01 + 1);
		expect(vData.length).toBe(2);

		expect(vData['values'][1].id).toEqual(id02);
		expect((vData['values'][1] as Vertex).position).toEqual(test_pos02);

		expect((vData.first as Vertex).position).toEqual(test_pos01);
	});
	test('make vertex failed', ():void => {
		const vData = new VertexData();
		expect(vData.make([0.0, 0.0])).toBe(-1);

		expect(vData.length).toBe(0);
		expect(vData.first).toBeNull();
	});
	test('delete vertex', ():void => {
		const vData = new VertexData();

		const test_pos01 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos02 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos03 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		vData.make(test_pos01);
		vData.make(test_pos02);
		vData.make(test_pos03);

		const v01 = vData['values'][0] as Vertex;
		const v03 = vData['values'][2] as Vertex;

		expect(vData.delete(vData['values'][1] as Vertex)).toBeTruthy();

		expect(vData.length).toBe(2);

		expect(vData['values'][0].id).toEqual(v01.id);
		expect((vData['values'][0] as Vertex).position).toEqual(v01.position);

		expect(vData['values'][1].id).toEqual(v03.id);
		expect((vData['values'][1] as Vertex).position).toEqual(v03.position);
	});
	test('delete vertex failed', () => {
		const vData = new VertexData();

		const test_pos01 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos02 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos03 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		vData.make(test_pos01);
		vData.make(test_pos02);
		vData.make(test_pos03);

		expect(vData.delete(new Vertex(999, [0.0, 0.0, 0.0]))).toBeFalsy();
		expect(vData.length).toBe(3);
	});
	test('exist vertex', ():void => {
		const vData = new VertexData();

		const test_pos01 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos02 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const test_pos03 = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const id01 = vData.make(test_pos01);
		const id02 = vData.make(test_pos02);
		const id03 = vData.make(test_pos03);

		const v01 = vData.getVertex(id01);
		const v02 = vData.getVertex(id02);
		const v03 = vData.getVertex(id03);

		expect(v01).not.toBeNull();
		expect(v02).not.toBeNull();
		expect(v03).not.toBeNull();

		expect((v01 as Vertex).position).toEqual(test_pos01);
		expect((v02 as Vertex).position).toEqual(test_pos02);
		expect((v03 as Vertex).position).toEqual(test_pos03);

		const vv01 = vData.getVertex(v01 as Vertex);
		const vv02 = vData.getVertex(v02 as Vertex);
		const vv03 = vData.getVertex(v03 as Vertex);

		expect(vv01).not.toBeNull();
		expect(vv02).not.toBeNull();
		expect(vv03).not.toBeNull();

		expect(vv01).toEqual(v01);
		expect(vv02).toEqual(v02);
		expect(vv03).toEqual(v03);

		expect(vData.exist(id01)).toBeTruthy();
		expect(vData.exist(id02)).toBeTruthy();
		expect(vData.exist(id03)).toBeTruthy();

		expect(vData.exist(v01 as Vertex)).toBeTruthy();
		expect(vData.exist(v02 as Vertex)).toBeTruthy();
		expect(vData.exist(v03 as Vertex)).toBeTruthy();

		expect(vData.exist(vv01 as Vertex)).toBeTruthy();
		expect(vData.exist(vv02 as Vertex)).toBeTruthy();
		expect(vData.exist(vv03 as Vertex)).toBeTruthy();


		expect(vData.exist(999)).toBeFalsy();
		expect(vData.getVertex(999)).toBeNull();

		const fv = new Vertex(888);
		expect(vData.exist(fv)).toBeFalsy();
		expect(vData.getVertex(fv)).toBeNull();
	});
});
