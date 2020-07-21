import BaseElement from './BaseElement';
import HalfPrivate from './HalfPrivate';

export default class VertexPrivate extends BaseElement {
	public position: Array<number>;
	public halfs: Array<HalfPrivate> = [];

	constructor(id: number, pos: Array<number> = [0, 0, 0]) {
		super(id);

		this.position = pos;
	}
}
