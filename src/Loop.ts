import BaseElement from './BaseElement';
import Half from './Half';

export default class Loop extends BaseElement {
	private _halfs: Set<Half> = new Set([]);

	public get halfs(): Array<Half> {
		return Array.from(this._halfs);
	}

	public get numberOfCorner(): number {
		return this.halfs.length;
	}
	public get isTriangle(): boolean {
		return this.numberOfCorner === 3;
	}
	public get isQuadrangle(): boolean {
		return this.numberOfCorner === 4;
	}

	constructor(id: number, list: Array<Half>) {
		super(id);

		if (this.validateHalfs(list) === false) {
			throw new Error('Invalid Half list.');
		}

		this._halfs = new Set(list);
		for (const h of this.halfs) {
			h['_loop'] = this;
		}
	}
	private validateHalfs(list: Array<Half>): boolean {
		if (list.length === 3) {
			if (
				list[0].next === list[1] &&
				list[1].next === list[2] &&
				list[2].next === list[0] &&
				list[0].prev === list[2] &&
				list[1].prev === list[0] &&
				list[2].prev === list[1]
			) {
				return true;
			}
		} else if (list.length === 4) {
			if (
				list[0].next === list[1] &&
				list[1].next === list[2] &&
				list[2].next === list[3] &&
				list[3].next === list[0] &&
				list[0].prev === list[3] &&
				list[1].prev === list[0] &&
				list[2].prev === list[1] &&
				list[3].prev === list[2]
			) {
				return true;
			}
		} else {
			throw new Error('Loop is should be 3 or 4 Halfs.');
		}

		return false;
	}

	public getHalf(h: Half): boolean {
		return this._halfs.has(h);
	}
}
