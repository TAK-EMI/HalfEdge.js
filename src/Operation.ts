import Reference from './Reference';
import Vertex from './Vertex';
import Edge from './Edge';
import Loop from './Loop';

export default class Operation extends Reference {
	// 頂点
	public makeVertex(pos: Array<number>): Vertex {
		const id = this.vertexes.make(pos);
		const v = this.vertexes.getVertex(id);

		if (v === null) {
			throw new Error('Vertex generation failed.');
		}

		return v;
	}
	public deleteVertex(id: number): boolean;
	public deleteVertex(v: Vertex): boolean;
	public deleteVertex(v: number | Vertex): boolean {
		if (v instanceof Vertex) {
			return this.vertexes.delete(v as Vertex);
		} else {
			const vert = this.vertexes.getVertex(v);
			if (vert) {
				const eList = this.getEdgesOnVertex(vert);
				for (const e of eList) {
					this.deleteEdge(e);
				}

				return this.vertexes.delete(vert);
			} else {
				return false;
			}
		}
	}
	public moveVertex(v: Vertex, pos: Array<number>): boolean {
		const vert = this.vertexes.getVertex(v.id);
		if (vert === null) {
			return false;
		}
		vert['move'](pos);
		return true;
	}

	// 稜線
	public makeEdge(v1: Vertex, v2: Vertex): Edge {
		const hID01 = this.halfs.make(v1);
		const hID02 = this.halfs.make(v2);

		const h01 = this.halfs.getHalf(hID01);
		const h02 = this.halfs.getHalf(hID02);

		if (h01 === null || h02 === null) {
			throw new Error('Edge generation failed.');
		}

		const eID = this.edges.make(h01, h02);
		const e = this.edges.getEdge(eID);

		if (e === null) {
			throw new Error('Edge generation failed.');
		}

		return e;
	}
	public deleteEdge(e: Edge): boolean {
		const edge = this.edges.getEdge(e.id);
		if (edge === null) {
			return false;
		}

		const result = this.edges.delete(edge);
		if (result === false) {
			return false;
		}

		const h01 = edge.first;
		const h02 = edge.second;

		const v01 = h01.vertex;
		const v02 = h02.vertex;

		v01['deleteHalf'](h01);
		v02['deleteHalf'](h02);

		if (h01.loop !== null) {
			this.deleteLoop(h01.loop);
		}
		if (h02.loop !== null) {
			this.deleteLoop(h02.loop);
		}

		const hRet01 = this.halfs.delete(h01);
		const hRet02 = this.halfs.delete(h02);
		if (hRet01 === false || hRet02 === false) {
			throw new Error('Failed to remove the Halfs.');
		}

		return true;
	}

	// 面
	public makeLoop(vlist: Array<Vertex>): Loop {
		if (vlist.length === 3) {
			return this.makeTriangle(vlist);
		} else if (vlist.length === 4) {
			return this.makeQuadrangle(vlist);
		} else {
			throw new Error('Loop generation failed.');
		}
	}
	private makeTriangle(vList: Array<Vertex>): Loop {
		let e01 = this.getOneUndefinedEdgeVertexToVertex(vList[0], vList[1]);
		if (e01 === null) {
			e01 = this.makeEdge(vList[0], vList[1]);
		}
		let e02 = this.getOneUndefinedEdgeVertexToVertex(vList[1], vList[2]);
		if (e02 === null) {
			e02 = this.makeEdge(vList[1], vList[2]);
		}
		let e03 = this.getOneUndefinedEdgeVertexToVertex(vList[2], vList[0]);
		if (e03 === null) {
			e03 = this.makeEdge(vList[2], vList[0]);
		}

		const h01 = this.getHalfOnEdge(e01, vList[0]);
		const h02 = this.getHalfOnEdge(e02, vList[1]);
		const h03 = this.getHalfOnEdge(e03, vList[2]);

		h01['setNextHalf'](h02);
		h02['setNextHalf'](h03);
		h03['setNextHalf'](h01);

		const id = this.loops.make([h01, h02, h03]);
		const l = this.loops.getLoop(id);

		if (l === null) {
			throw new Error('Loop generation failed.');
		}

		return l;
	}
	private makeQuadrangle(vList: Array<Vertex>): Loop {
		let e01 = this.getOneUndefinedEdgeVertexToVertex(vList[0], vList[1]);
		if (e01 === null) {
			e01 = this.makeEdge(vList[0], vList[1]);
		}
		let e02 = this.getOneUndefinedEdgeVertexToVertex(vList[1], vList[2]);
		if (e02 === null) {
			e02 = this.makeEdge(vList[1], vList[2]);
		}
		let e03 = this.getOneUndefinedEdgeVertexToVertex(vList[2], vList[3]);
		if (e03 === null) {
			e03 = this.makeEdge(vList[2], vList[3]);
		}
		let e04 = this.getOneUndefinedEdgeVertexToVertex(vList[3], vList[0]);
		if (e04 === null) {
			e04 = this.makeEdge(vList[3], vList[0]);
		}

		const h01 = this.getHalfOnEdge(e01, vList[0]);
		const h02 = this.getHalfOnEdge(e02, vList[1]);
		const h03 = this.getHalfOnEdge(e03, vList[2]);
		const h04 = this.getHalfOnEdge(e04, vList[3]);

		h01['setNextHalf'](h02);
		h02['setNextHalf'](h03);
		h03['setNextHalf'](h04);
		h04['setNextHalf'](h01);

		const id = this.loops.make([h01, h02, h03, h04]);
		const l = this.loops.getLoop(id);

		if (l === null) {
			throw new Error('Loop generation failed.');
		}

		return l;
	}
	public deleteLoop(l: Loop): boolean {
		const hList = l.halfs;
		for (const h of hList) {
			h['_loop'] = null;
			h['setNextHalf'](null);
		}

		return this.loops.delete(l);
	}
}
