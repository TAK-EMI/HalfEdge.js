import BaseElement from './BaseElement';

export class Vertex extends BaseElement {
	public position: Array<number>;

	constructor(pos: Array<number> = [0, 0, 0]) {
		super();

		this.position = pos;
	}
}
