import Vertex from './Vertex';
import Half from './Half';
import Edge from './Edge';
import Loop from './Loop';

import VertexData from './VertexData';
import HalfData from './HalfData';
import EdgeData from './EdgeData';
import LoopData from './LoopData';

export default class DataAccess {
	protected vertexes: VertexData;
	protected halfs: HalfData;
	protected edges: EdgeData;
	protected loops: LoopData;

	public get vertexLength(): number {
		return this.vertexes.length;
	}
	public get halfLength(): number {
		return this.halfs.length;
	}
	public get edgeLength(): number {
		return this.edges.length;
	}
	public get loopLength(): number {
		return this.loops.length;
	}

	constructor() {
		this.vertexes = new VertexData();
		this.halfs = new HalfData();
		this.edges = new EdgeData();
		this.loops = new LoopData();
	}

	public getFirstVertex(): Vertex | null {
		const v = this.vertexes.first;
		return v === null ? null : (v as Vertex);
	}
	public getLastVertex(): Vertex | null {
		const v = this.vertexes.last;
		return v === null ? null : (v as Vertex);
	}
	public existVertex(v: Vertex): boolean {
		return this.vertexes.exist(v);
	}
	public getVertex(id: number): Vertex | null {
		return this.vertexes.getVertex(id);
	}

	public getFirstHalf(): Half | null {
		const h = this.halfs.first;
		return h === null ? null : (h as Half);
	}
	public getLastHalf(): Half | null {
		const h = this.halfs.last;
		return h === null ? null : (h as Half);
	}
	public existHalf(h: Half): boolean {
		return this.halfs.exist(h);
	}
	public getHalf(id: number): Half | null {
		return this.halfs.getHalf(id);
	}

	public getFirstEdge(): Edge | null {
		const e = this.edges.first;
		return e === null ? null : (e as Edge);
	}
	public getLastEdge(): Edge | null {
		const e = this.edges.last;
		return e === null ? null : (e as Edge);
	}
	public existEdge(e: Edge): boolean {
		return this.edges.exist(e);
	}
	public getEdge(id: number): Edge | null {
		return this.edges.getEdge(id);
	}

	public getFirstLoop(): Loop | null {
		const l = this.loops.first;
		return l === null ? null : (l as Loop);
	}
	public getLastLoop(): Loop | null {
		const l = this.loops.last;
		return l === null ? null : (l as Loop);
	}
	public existLoop(l: Loop): boolean {
		return this.loops.exist(l);
	}
	public getLoop(id: number): Loop | null {
		return this.loops.getLoop(id);
	}
}
