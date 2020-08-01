import DataAccess from './DataAccess';
import Vertex from './Vertex';
import Edge from './Edge';
import Loop from './Loop';
import Half from './Half';

export default class Reference extends DataAccess {
	// 頂点系
	public getHalfsOnVertex(v: Vertex): Array<Half> {
		return v.halfs;
	}
	public getEdgesOnVertex(v: Vertex): Array<Edge> {
		const ret = new Array<Edge>();

		for (const h of v.halfs) {
			ret.push(h.edge as Edge);
		}

		return ret;
	}
	public getLoopsOnVertex(v: Vertex): Array<Loop> {
		const ret = new Array<Loop>();

		for (const h of v.halfs) {
			const l = h.loop;
			if (l !== null) {
				ret.push(l);
			}
		}

		return ret;
	}
	public getNeighborVertexesOnVertex(v: Vertex): Array<Vertex> {
		const ret = new Array<Vertex>();

		for (const h of v.halfs) {
			ret.push(this.getMateHalfOnHalf(h).vertex);
		}

		return ret;
	}
	public getEdgeNumberOnVertex(v: Vertex): number {
		return v.halfs.length;
	}
	public getEdgeOnVertexToVertex(v1: Vertex, v2: Vertex): Array<Edge> {
		const ret = new Array<Edge>();

		for (const h of v1.halfs) {
			if (this.getMateHalfOnHalf(h).vertex === v2) {
				if (h.edge !== null) {
					ret.push(h.edge);
				}
			}
		}

		return ret;
	}
	/**
	 * v1とv2を結ぶ未定義稜線を取得する。
	 * 未定義稜線：面を持たない、または1つしか持たない稜線。
	 * 稜線ないし未定義稜線が無い場合はnullを返す。
	 */
	public getOneUndefinedEdgeVertexToVertex(v1: Vertex, v2: Vertex): Edge | null {
		const list = this.getEdgeOnVertexToVertex(v1, v2);
		if (list.length === 0) {
			return null;
		}

		for (const e of list) {
			if (this.hasNoLoopOnEdge(e) || this.hasOneLoopOnEdge(e)) {
				return e;
			}
		}

		return null;
	}

	// 半稜線系
	public getMateHalfOnHalf(h: Half): Half {
		return h.edge?.getMateHalf(h) as Half;
	}

	// 稜線系
	public getFirstVertexOnEdge(e: Edge): Vertex {
		return e.first.vertex;
	}
	public getSecondVertexOnEdge(e: Edge): Vertex {
		return e.second.vertex;
	}
	public getFirstLoopOnEdge(e: Edge): Loop | null {
		return e.first.loop;
	}
	public getSecondLoopOnEdge(e: Edge): Loop | null {
		return e.second.loop;
	}
	public hasOneLoopOnEdge(e: Edge): boolean {
		return (e.first.loop === null && e.second.loop !== null) || (e.first.loop !== null && e.second.loop === null);
	}
	public hasTwoLoopOnEdge(e: Edge): boolean {
		return e.first.loop !== null && e.second.loop !== null;
	}
	public hasNoLoopOnEdge(e: Edge): boolean {
		return e.first.loop === null && e.second.loop === null;
	}
	public getHalfOnEdge(e: Edge, v: Vertex): Half {
		if (e.first.vertex === v) {
			return e.first;
		} else if (e.second.vertex === v) {
			return e.second;
		} else {
			throw new Error('Edges and Vertices are unrelated.');
		}
	}
	public getMateVertexOnEdge(e: Edge, v: Vertex): Vertex {
		const half = this.getHalfOnEdge(e, v);
		return this.getMateHalfOnHalf(half).vertex;
	}

	// 面系
	public getVertexesOnLoop(l: Loop): Array<Vertex> {
		const ret = new Array<Vertex>();

		for (const h of l.halfs) {
			ret.push(h.vertex);
		}

		return ret;
	}
	public getEdgesOnLoop(l: Loop): Array<Edge> {
		const ret = new Array<Edge>();

		for (const h of l.halfs) {
			ret.push(h.edge as Edge);
		}

		return ret;
	}
	public getNeighborLoopsOnLoop(l: Loop): Array<Loop> {
		const ret = new Array<Loop>();

		for (const h of l.halfs) {
			const loop = h.loop;
			if (loop !== null) {
				ret.push(loop);
			}
		}

		return ret;
	}
}
