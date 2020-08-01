import Half from './Half';
import BaseElement from './BaseElement';

export default class Edge extends BaseElement {
	private _first: Half;
	private _second: Half;

	public get first(): Half {
		return this._first;
	}
	public get second(): Half {
		return this._second;
	}

	constructor(id: number, h1: Half, h2: Half) {
		super(id);

		this._first = h1;
		this._second = h2;

		this._first['_edge'] = this;
		this._second['_edge'] = this;
	}

	public existHalf(h: Half): boolean {
		return this._first.uuid === h.uuid || this._second.uuid === h.uuid;
	}
	public getMateHalf(h: Half): Half | null {
		if (this._first === h) {
			return this._second;
		} else if (this._second === h) {
			return this._first;
		} else {
			return null;
		}
	}
}
