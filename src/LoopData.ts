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
		const value = this.getValue(l);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(id: number): boolean;
	public exist(l: Loop): boolean;
	public exist(l: Loop | number): boolean {
		if (l instanceof Loop) {
			return super.exist(l as BaseElement);
		} else {
			return super.exist(l as number);
		}
	}

	public getLoop(id: number): Loop | null;
	public getLoop(l: Loop): Loop | null;
	public getLoop(l: Loop | number): Loop | null {
		if (l instanceof Loop) {
			const ret = super.getValue(l as BaseElement);
			return ret === null ? null : (ret as Loop);
		} else {
			const ret = super.getValue(l as number);
			return ret === null ? null : (ret as Loop);
		}
	}
}
