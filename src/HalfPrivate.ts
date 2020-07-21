import BaseElement from './BaseElement';
import VertexPrivate from './VertexPrivate';
import EdgePrivate from './EdgePrivate';
import LoopPrivate from './LoopPrivate';

export default class HalfPrivate extends BaseElement {
	public vertex: VertexPrivate;
	public edge: EdgePrivate | null = null;
	public loop: LoopPrivate | null = null;
	public prev: HalfPrivate | null = null;
	public next: HalfPrivate | null = null;

	constructor(id: number, v: VertexPrivate) {
		super(id);
		this.vertex = v;
	}
}
