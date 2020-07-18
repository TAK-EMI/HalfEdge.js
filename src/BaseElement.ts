import * as UUID from 'uuid';

export default class BaseElement {
	public uuid: string;

	constructor() {
		this.uuid = UUID.v4();
	}
}
