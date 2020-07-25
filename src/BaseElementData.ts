import BaseElement from './BaseElement';

export default class BaseElementData {
	public get length(): number {
		return this.values.length;
	}
	public get first(): BaseElement | null {
		return this.values.length === 0 ? null : this.values[0];
	}
	public get newID(): number {
		return this.id_max++;
	}

	/**
	 * 要素の存在確認
	 *
	 * @param value ID or BaseElement
	 */
	public exist(id: number): boolean;
	public exist(elem: BaseElement): boolean;
	public exist(value: number | BaseElement): boolean {
		if (value instanceof BaseElement) {
			return this.getValue(value as BaseElement) !== null;
		} else {
			return this.getValue(value as number) !== null;
		}
	}

	/**
	 * 要素取得
	 *
	 * @param value ID or BaseElement
	 */
	protected getValue(id: number): BaseElement | null;
	protected getValue(elem: BaseElement): BaseElement | null;
	protected getValue(value: number | BaseElement): BaseElement | null {
		let find = null;

		if (value instanceof BaseElement) {
			find = this.values.filter((v) => v.uuid === value.uuid);
		} else {
			find = this.values.filter((v) => v.id === value);
		}

		return find && find.length > 0 ? find[0] : null;
	}

	protected values: Array<BaseElement> = [];
	private id_max = 0;
}
