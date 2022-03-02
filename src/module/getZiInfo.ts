import { ICharResultDataIndex } from "@/pages/CharResult";
import React from "react";

export const isUnicode = (uni: string): boolean => !"012".includes(uni[0]); // !(~~uni[0] < 2); // 原函数对于兼容区识别有误。

export const getZiZone = (cjd: number, uni: string) => {
	if (!uni || !uni.length || uni.toUpperCase().match(/[^0-9A-F]/)) return undefined;
	if (!isUnicode(uni)) return "非 Unicode 临时码";
	else return new Map<number, string>([
		[0, "其他区"],
		[1, "基本区 一级字"],
		[2, "基本区 二级字"],
		[3, "基本区 三级字"],
		[4, "基本区"],
		[11, "扩展A 二级字"],
		[12, "扩展A 三级字"],
		[14, "基本区补充 三级"],
		[15, "基本区补充"],
		[13, "扩展A"],
		[16, "扩展A补充"],
		[17, "兼容区"],
		[18, "兼容区非兼容字"],
		[19, "扩展B 二级字"],
		[20, "扩展B 三级字"],
		[21, "扩展B"],
		[22, "扩展B"],
		[23, "扩展B补充"],
		[25, "部首扩展"],
		[26, "康熙部首"],
		[30, "扩展C 三级字"],
		[31, "扩展C"],
		[33, "扩展D 三级字"],
		[34, "扩展D"],
		[35, "扩展E 二级字"],
		[36, "扩展E 三级字"],
		[37, "扩展E"],
		[38, "扩展F"],
		[39, "兼容扩展"],
		[41, "扩展G"],
	]).get(+cjd);
};

export const getDictIndex = (dicts: ICharResultDataIndex[]) => (
	React.createElement("table", null,
		React.createElement("tbody", null,
			dicts.map((dict, index) => {
				const name = dict.name === "zhonghuaZihai" ? "中华字海" : dict.name === "hanyuDaZidian" ? "汉语大字典" : "";
				return React.createElement("tr", { key: `dict-${index}` },
					React.createElement("td", null, name),
					React.createElement("td", null,
						dict.index.page === -1 ? "未收" : `第 ${dict.index.page} 页，第 ${dict.index.number} 字`
					)
				);
			})
		)
	)
);

export const getIds = (ids: string): JSX.Element => {
	const idses = ids.split(","),
		results: [string, React.ReactNode[]][] = [];
	for (let ids of idses) {
		if (!ids.match(/\(/)) ids = `(${ids})`;
		const idsContent = ids.replace(/\(.*\)/g, "").trim() || "<暂无>",
			regionContent = (ids.match(/(?<=\().*(?=\))/) ?? [""])[0].trim(),
			region = Array.from(regionContent).map((value, index) => ((map: Map<string, [string, string]>) => {
				const res = map.get(value);
				if (res) return React.createElement("span", { title: res[1], key: index }, res[0]);
			})(new Map([
				["G", ["陆", "中国大陆"]],
				["T", ["台", "中国台湾"]],
				["H", ["港", "中国香港"]],
				["M", ["澳", "中国澳门"]],
				["1G", ["陆1", "中国大陆（一）"]],
				["1H", ["港1", "中国香港（一）"]],
				["J", ["日", "日本"]],
				["K", ["韩", "韩国"]],
				["V", ["越", "越南"]],
				["X", ["新", "中国大陆（新加坡）"]],
				["U", ["委", "统一码委员会"]],
				["S", ["大", "大正新修大藏经"]],
				["Y", ["英", "英国"]],
				["Z", ["他", "其他"]],
				["P", ["朝", "朝鲜"]],
				["N", ["", ""]]
			])));
		results.push([idsContent, region]);
	}
	return React.createElement("div", null,
		results.map((result, index) => React.createElement("span", { key: index }, result[0],
			React.createElement("sup", null, result[1])
		))
	);
};

export const getRegionSource = (regionSource: string): JSX.Element => (
	React.createElement(React.Fragment, null, regionSource.split(",").map((source, index) => {
		const _source = source.split("-");
		return React.createElement("div", { key: `regionSource-${index}` },
			_source.length >= 2 ? React.createElement("b", null, _source[0]) : null,
			"-" + _source[1]
		);
	}))
)
