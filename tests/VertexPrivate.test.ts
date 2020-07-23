import VertexPrivate from "#/VertexPrivate";

describe('VertexPrivate', (): void => {
	test(`create instance`, (): void => {
		const v = new VertexPrivate(0, [0.0, 0.0, 0.0]);
		expect(v.id).toBe(0);
	});
})

