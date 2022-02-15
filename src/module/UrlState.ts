enum SetMethodType {
	SET, APPEND
}

type dataObj = { [key: string]: any; };

export class UrlState {
	/**
	 * 获取当前网址问号之后参数的对象。
	 */
	private get urlSearchParams(): URLSearchParams {
		return new URLSearchParams(location.search.slice(1));
	}
	/**
	 * 将网址问号之后参数转换为对象。
	 * @param urlSp - 网址问号之后参数的对象。
	 * @returns 标准对象。
	 */
	private static toObject(urlSp: URLSearchParams): any {
		const obj: any = {};
		urlSp.forEach((value, key) => obj[key] = value);
		return obj;
	}
	/**
	 * 获取网址问号之后参数的值。
	 * @param key - 键名。
	 * @returns 参数值。
	 */
	public get(key: string): string | null {
		return this.urlSearchParams.get(key);
	}
	/**
	 * 获取网址问号之后参数的所有的值。即若给定的键名共有多个参数，则返回所有的值。
	 * @param key - 键名。
	 * @returns 所有该键名的参数值。
	 */
	public getAll(key: string): string[] {
		return this.urlSearchParams.getAll(key);
	}
	/**
	 * 将给定的参数键值对象设为当前网页问号之后的参数，同时推送一条浏览器历史记录。
	 * 如有相同的键名则替换之为给定的值，同时去除重复的该键名。
	 * @param data - 参数数据对象。
	 */
	public set(data: dataObj): void;
	/**
	 * 将给定的参数键值对象设为当前网页问号之后的参数，同时推送一条浏览器历史记录。
	 * 如有相同的键名则替换之为给定的值，同时去除重复的该键名。
	 * @param key - 参数数据对象键名。
	 * @param value - 参数数据对象值。
	 */
	public set(key: string, value: any): void;
	public set(key: any, value?: any): void {
		let data: dataObj = key;
		if (typeof key === "string") data = { [key]: value };
		const urlSp = this.urlSearchParams;
		UrlState.setDatas(urlSp, data, SetMethodType.SET);
		UrlState.pushState(urlSp);
	}
	/**
	 * 将给定的参数键值对象追加到当前网页问号之后的参数，同时推送一条浏览器历史记录。
	 * 不删除现有网址参数，追加在其之后。
	 * @param data - 参数数据对象。
	 */
	public append(data: dataObj): void;
	/**
	 * 将给定的参数键值对象追加到当前网页问号之后的参数，同时推送一条浏览器历史记录。
	 * 不删除现有网址参数，追加在其之后。
	 * @param key - 参数数据对象键名。
	 * @param value - 参数数据对象值。
	 */
	public append(key: string, value: any): void;
	public append(key: any, value?: any): void {
		let data: dataObj = key;
		if (typeof key === "string") data = { [key]: value };
		const urlSp = this.urlSearchParams;
		UrlState.setDatas(urlSp, data, SetMethodType.APPEND);
		UrlState.pushState(urlSp);
	}
	/**
	 * 删除网页问号之后全部参数，然后将给定的参数键值对象设为当前网页问号之后的参数，同时推送一条浏览器历史记录。
	 * @param data - 参数数据对象。
	 */
	public inject(data: dataObj): void;
	/**
	 * 删除网页问号之后全部参数，然后将给定的参数键值对象设为当前网页问号之后的参数，同时推送一条浏览器历史记录。
	 * @param key - 参数数据对象键名。
	 * @param value - 参数数据对象值。
	 */
	public inject(key: string, value: any): void;
	public inject(key: any, value?: any): void {
		let data: dataObj = key;
		if (typeof key === "string") data = { [key]: value };
		const urlSp = new URLSearchParams();
		UrlState.setDatas(urlSp, data, SetMethodType.SET);
		UrlState.pushState(urlSp);
	}
	/**
	 * 将标准对象上的键值设到指定的网址问号之后参数的对象上。
	 * @param urlSp - 网址问号之后参数的对象。
	 * @param data - 标准对象。
	 * @param setMethod - 设定键值的方法枚举。
	 * @returns 网址问号之后参数的对象。与参数{@code urlSp}一致，以便嵌套函数使用。
	 */
	private static setDatas(urlSp: URLSearchParams, data: dataObj, setMethod: SetMethodType): URLSearchParams {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const value = data[key];
				if (setMethod === SetMethodType.SET) urlSp.set(key, value);
				else if (setMethod === SetMethodType.APPEND) urlSp.append(key, value);
			}
		}
		return urlSp;
	}
	/**
	 * 更改当前网址问号之后的参数，并推送一条浏览器历史记录。
	 * @param urlSp - 网址问号之后参数的对象。
	 */
	private static pushState(urlSp: URLSearchParams): void {
		const data = this.toObject(urlSp);
		history.pushState(data, "", "?" + urlSp.toString())
	}
}

export default new UrlState();
