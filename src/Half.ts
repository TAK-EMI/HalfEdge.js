import BaseElement from './BaseElement';
import Vertex from './Vertex';
import Edge from './Edge';
import Loop from './Loop';

export default class Half extends BaseElement {
	private _vertex: Vertex;
	private _edge: Edge | null = null;
	private _loop: Loop | null = null;
	private _prev: Half | null = null;
	private _next: Half | null = null;

	public get vertex(): Vertex {
		return this._vertex;
	}
	public get edge(): Edge | null {
		return this._edge;
	}
	public get loop(): Loop | null {
		return this._loop;
	}
	public get prev(): Half | null {
		return this._prev;
	}
	public get next(): Half | null {
		return this._next;
	}

	public get hasLoop(): boolean {
		return this._loop !== null;
	}

	constructor(id: number, v: Vertex) {
		super(id);

		this._vertex = v;
		v['addHalf'](this);
	}
	protected setNextHalf(h: Half | null): void {
		if (h === null) {
			if (this._next !== null) {
				this._next['setPrevHalf'](null);
			}
			this._next = null;
		} else {
			this._next = h;
			if (h.prev !== this) {
				h['setPrevHalf'](this);
			}
		}
	}
	protected setPrevHalf(h: Half | null): void {
		if (h === null) {
			if (this._prev !== null) {
				this._prev['setNextHalf'](null);
			}
			this._prev = null;
		} else {
			this._prev = h;
			if (h.next !== this) {
				h['setNextHalf'](this);
			}
		}
	}
}
