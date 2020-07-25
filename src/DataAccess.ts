import VertexData from './VertexData';
import HalfData from './HalfData';
import EdgeData from './EdgeData';
import LoopData from './LoopData';

export default class DataAccess {
	protected vertexes: VertexData;
	protected halfs: HalfData;
	protected edges: EdgeData;
	protected loops: LoopData;

	constructor() {
		this.vertexes = new VertexData();
		this.halfs = new HalfData();
		this.edges = new EdgeData();
		this.loops = new LoopData();
	}
}
