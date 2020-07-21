import BaseElement from './BaseElement';
import HalfPrivate from './HalfPrivate';

export default class EdgePrivate extends BaseElement {
	public first: HalfPrivate;
	public second: HalfPrivate;

	constructor(id: number, h1: HalfPrivate, h2: HalfPrivate) {
		super(id);

		this.first = h1;
		this.second = h2;
	}
}
