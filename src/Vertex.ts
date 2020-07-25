import BaseElement from './BaseElement';
import Half from './Half';

export default class Vertex extends BaseElement {
	private _position: Array<number> = [0, 0, 0];
	private _halfs: Set<Half> = new Set([]);

	public get position(): Array<number> {
		return this._position;
	}
	public get halfs(): Array<Half> {
		return Array.from(this._halfs);
	}

	constructor(id: number, pos: Array<number> = [0.0, 0.0, 0.0]) {
		super(id);
		this.move(pos);
	}

	public existHalf(h: Half): boolean {
		return this._halfs.has(h);
	}

	protected move(pos: Array<number>): void {
		if (pos.length < 3) {
			throw new Error('Argument array size is should be 3.');
		}

		this._position = pos.slice(0, 3);
	}
	protected addHalf(h: Half): boolean {
		if (this._halfs.has(h) === true) {
			return false;
		}
		if (h.vertex !== this) {
			return false;
		}

		this._halfs.add(h);
		return true;
	}
	protected deleteHalf(h: Half): boolean {
		return this._halfs.delete(h);
	}
}
