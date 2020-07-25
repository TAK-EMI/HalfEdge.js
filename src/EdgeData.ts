import BaseElementData from './BaseElementData';
import Half from './Half';
import Edge from './Edge';
import BaseElement from './BaseElement';

export default class EdgeData extends BaseElementData {
	/**
	 *
	 * @returns 生成した頂点のID。
	 * 失敗した場合は、-1を返す。
	 */
	public make(h01: Half, h02: Half): number {
		try {
			const e = new Edge(this.newID, h01, h02);
			h01['_edge'] = e;
			h02['_edge'] = e;

			this.values.push(e);
			return e.id;
		} catch (error) {
			return -1;
		}
	}
	public delete(e: Edge): boolean {
		const value = this.getValue(e);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(id: number): boolean;
	public exist(e: Edge): boolean;
	public exist(e: Edge | number): boolean {
		if (e instanceof Edge) {
			return super.exist(e as BaseElement);
		} else {
			return super.exist(e as number);
		}
	}

	public getEdge(id: number): Edge | null;
	public getEdge(e: Edge): Edge | null;
	public getEdge(e: Edge | number): Edge | null {
		if (e instanceof Edge) {
			const ret = super.getValue(e as BaseElement);
			return ret === null ? null : (ret as Edge);
		} else {
			const ret = super.getValue(e as number);
			return ret === null ? null : (ret as Edge);
		}
	}
}
