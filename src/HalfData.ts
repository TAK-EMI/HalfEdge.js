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
		const value = this.getValue(h.id);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(h: Half): boolean {
		return super.exist(h as BaseElement);
	}

	public getHalf(id: number): Half | null {
		const ret = super.getValue(id);
		return ret === null ? null : (ret as Half);
	}
}
