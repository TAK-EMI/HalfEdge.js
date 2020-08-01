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
		const value = this.getValue(v.id);
		if (value === null) {
			return false;
		}

		this.values.splice(this.values.indexOf(value), 1);
		return true;
	}

	public exist(v: Vertex): boolean {
		return super.exist(v as BaseElement);
	}

	public getVertex(id: number): Vertex | null {
		const ret = super.getValue(id);
		return ret === null ? null : (ret as Vertex);
	}
}
