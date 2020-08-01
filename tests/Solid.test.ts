import Solid from '#/Solid';

describe('Solid', ():void => {
	test('instance', ():void => {
		const solid = new Solid();

		expect(solid).not.toBeNull();

		expect(solid.vertexLength).toBe(0);
		expect(solid.halfLength).toBe(0);
		expect(solid.edgeLength).toBe(0);
		expect(solid.loopLength).toBe(0);
	});
	test('make vertex', ():void => {
		const solid = new Solid();

		const test_pos = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];
		const id01 = solid.makeVertex(test_pos);

		expect(id01).not.toBe(-1);

		expect(solid.vertexLength).toBe(1);
		expect(solid.halfLength).toBe(0);
		expect(solid.edgeLength).toBe(0);
		expect(solid.loopLength).toBe(0);
	});
	test('delete vertex', ():void => {
	
	});
});
