import * as UUID from 'uuid';

export default class BaseElement {
	public uuid: string;
	public id: number;

	constructor(id: number) {
		this.uuid = UUID.v4();
		this.id = id;
	}
}
