import BaseElement from './BaseElement';
import HalfPrivate from './HalfPrivate';

export default class VertexPrivate extends BaseElement {
	public position: Array<number>;
	public halfs: Array<HalfPrivate> = [];

	constructor(id: number, pos: Array<number> = [0, 0, 0]) {
		super(id);

		if (pos.length < 3) {
			throw new Error('Argument array size is should be 3.');
		}

		this.position = pos.slice(0, 3);
	}
}
