import BaseElementData from './BaseElementData';
import Vertex from './Vertex';
import Half from './Half';
import BaseElement from './BaseElement';

export default class HalfData extends BaseElementData {
	/**
	 *
	 * @param v 始点となる頂点
	 * @returns 生成した頂点のID。
	 * 失敗した場合は、-1を返す。
	 */
	public make(v: Vertex): number {
		try {
			const h = new Half(this.newID, v);

			v['addHalf'](h);

			this.values.push(h);
			return h.id;
		} catch (error) {
			return -1;
		}
	}
	public delete(h: Half): boolean {
		const value = this.getValue(h);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(id: number): boolean;
	public exist(h: Half): boolean;
	public exist(h: Half | number): boolean {
		if (h instanceof Half) {
			return super.exist(h as BaseElement);
		} else {
			return super.exist(h as number);
		}
	}

	public getHalf(id: number): Half | null;
	public getHalf(h: Half): Half | null;
	public getHalf(h: Half | number): Half | null {
		if (h instanceof Half) {
			const ret = super.getValue(h as BaseElement);
			return ret === null ? null : (ret as Half);
		} else {
			const ret = super.getValue(h as number);
			return ret === null ? null : (ret as Half);
		}
	}
}
