import BaseElement from './BaseElement';

export default class BaseElementData {
	public get length(): number {
		return this.values.length;
	}
	public get first(): BaseElement | null {
		return this.values.length === 0 ? null : this.values[0];
	}
	public get last(): BaseElement | null {
		return this.values.length === 0 ? null : this.values[this.values.length - 1];
	}
	public get newID(): number {
		return this.id_max++;
	}

	public exist(elem: BaseElement): boolean {
		const find = this.values.filter((v) => v.uuid === elem.uuid);
		return find.length > 0;
	}
	protected getValue(id: number): BaseElement | null {
		const find = this.values.filter((v) => v.id === id);
		return find && find.length > 0 ? find[0] : null;
	}

	protected values: Array<BaseElement> = [];
	private id_max = 0;
}
