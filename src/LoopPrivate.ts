import BaseElement from './BaseElement';
import HalfPrivate from './HalfPrivate';

export default class LoopPrivate extends BaseElement {
	public halfs: Array<HalfPrivate>;

	public get numberOfCorner(): number {
		return this.halfs.length;
	}
	public get isTriangle(): boolean {
		return this.numberOfCorner === 3;
	}
	public get isQuadrangle(): boolean {
		return this.numberOfCorner === 4;
	}

	constructor(id: number, list: Array<HalfPrivate>) {
		super(id);

		if (list.length < 3) {
			throw 'Loop is should be 3 or 4 Halfs.';
		} else if (list.length === 3 || list.length === 4) {
			this.halfs = list;
		} else {
			this.halfs = list.slice(3);
		}
	}
}
