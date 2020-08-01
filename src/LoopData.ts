import BaseElementData from './BaseElementData';
import BaseElement from './BaseElement';
import Loop from './Loop';
import Half from './Half';

export default class LoopData extends BaseElementData {
	/**
	 *
	 * @returns 生成した頂点のID。
	 * 失敗した場合は、-1を返す。
	 */
	public make(halfs: Array<Half>): number {
		try {
			const l = new Loop(this.newID, halfs);
			for (const h of halfs) {
				h['_loop'] = l;
			}

			this.values.push(l);
			return l.id;
		} catch (error) {
			return -1;
		}
	}
	public delete(l: Loop): boolean {
		const value = this.getValue(l.id);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(l: Loop): boolean {
		return super.exist(l as BaseElement);
	}

	public getLoop(id: number): Loop | null {
		const ret = super.getValue(id);
		return ret === null ? null : (ret as Loop);
	}
}
