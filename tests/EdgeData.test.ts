import EdgeData from '#/EdgeData';

describe.skip('EdgeData', ():void => {
	test('instance', ():void => {
		const eData = new EdgeData();

		expect(eData).not.toBeNull();
		expect(eData.length).toBe(0);
		expect(eData.first).toBeNull();
	});
	test('make', ():void => {
	
	});
	test('delete', ():void => {
	
	});
	test('delete failed', ():void => {
	
	});
	test('update', ():void => {
	
	});
	test('update failed', ():void => {
	
	});
});
