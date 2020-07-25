import BaseElementData from './BaseElementData';
import Vertex from './Vertex';
import BaseElement from './BaseElement';

export default class VertexData extends BaseElementData {
	/**
	 *
	 * @param pos 頂点の位置座標
	 * @returns 生成した頂点のID。
	 * 失敗した場合は、-1を返す。
	 */
	public make(pos: Array<number> = [0.0, 0.0, 0.0]): number {
		try {
			const v = new Vertex(this.newID, pos);

			this.values.push(v);
			return v.id;
		} catch (error) {
			return -1;
		}
	}
	public delete(v: Vertex): boolean {
		const value = this.getValue(v);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(id: number): boolean;
	public exist(v: Vertex): boolean;
	public exist(v: Vertex | number): boolean {
		if (v instanceof Vertex) {
			return super.exist(v as BaseElement);
		} else {
			return super.exist(v as number);
		}
	}

	public getVertex(id: number): Vertex | null;
	public getVertex(v: Vertex): Vertex | null;
	public getVertex(v: Vertex | number): Vertex | null {
		if (v instanceof Vertex) {
			const ret = super.getValue(v as BaseElement);
			return ret === null ? null : (ret as Vertex);
		} else {
			const ret = super.getValue(v as number);
			return ret === null ? null : (ret as Vertex);
		}
	}
}
