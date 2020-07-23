import VertexPrivate from '#/VertexPrivate';

describe('VertexPrivate', (): void => {
	test(`create instance success`, (): void => {
		const test_id = Math.round(Math.random() * 10000);
		const test_pos = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000];

		const v = new VertexPrivate(test_id, test_pos);
		expect(v).not.toBeNull();

		expect(v.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(v.id).toEqual(test_id);
		expect(v.position).toEqual(test_pos);
		expect(v.halfs).toEqual([]);
	});
	test('Omit argument', (): void => {
		const test_id = Math.round(Math.random() * 10000);
		const v = new VertexPrivate(test_id);

		expect(v).not.toBeNull();

		expect(v.uuid).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/);
		expect(v.id).toEqual(test_id);
		expect(v.position).toEqual([0.0, 0.0, 0.0]);
	});
	test('create instance failed', (): void => {
		const test_id = Math.round(Math.random() * 10000);
		const test_pos = [Math.random() * 10000, Math.random() * 10000];

		expect(() => {new VertexPrivate(test_id, test_pos)}).toThrow('Argument array size is should be 3.');
	});
})

