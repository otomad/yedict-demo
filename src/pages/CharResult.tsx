import AccentFont from "@/components/AccentFont";
import BookPage from "@/components/BookPage";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import SectionContent from "@/components/SectionContent";
import SplitLine from "@/components/SplitLine";
import ResultPage from "@/module/ResultPage";
import stringMarkInternalLink from "@/module/stringMarkInternalLink";
import React from "react";
import styles from "./CharResult.module.scss";
import hyperlinkStyle from "@/style/hyperlink.module.scss";
import CharViewer from "@/components/CharViewer";
import { getDictIndex, getIds, getRegionSource, getZiZone, isUnicode } from "@/module/getZiInfo";

//#region interfaces
/* interface IAdjacentChar {
	char: string;
	code: string;
}

type VariantsType = (string | {
	code: string;
	pic: string;
});

interface IExplain {
	source: string;
	content: string;
	variants?: VariantsType[];
}

interface ICharResultData {
	mode: "char";
	char: string;
	area: string;
	isUnicode: boolean;
	code: string;
	strokes: number;
	radical: string;
	half: string;
	ids: string;
	source: string;
	cnzisea: string;
	reference: string;
	prevChar: IAdjacentChar;
	nextChar: IAdjacentChar;
	explain: IExplain[];
} */

/** 字典索引 */
export interface ICharResultDataIndex {
	/** 字典名称 */
	name: "zhonghuaZihai" | "hanyuDaZidian";
	index: {
		/** 页码 */
		page: number;
		/** 页面中第几字 */
		number: number;
	}
}

/** 单字地区数据 */
interface ICharResultDataAera {
	area: string[];
	font: string[];
	standardZi: string[];
	variant: string[];
	explaining: string;
	cun: string[];
}

type VariantsType = string[] | [null];

/** 单字数据 */
interface ICharResultData {
	/** ID */
	id: number;
	/** 显示 ID */
	showId: number;
	/** 笔画 */
	stroke: number;
	/** 部外笔画 */
	strokeRemaining: number;
	/** 部首 */
	radical: string;
	/** 国家 */
	country: string;
	/** 字形描述 */
	ids: string;
	/** 结构？ */
	structure: number;
	/** 释义 */
	explaining: string;
	/** 两分首部笔画 */
	headPartStroke: number;
	/** 两分首部拼音？ */
	headPartPinyin: string;
	/** 两分首部 */
	headPart: string;
	/** 相容首部 */
	compatiableHeadPart: string;
	/** 来源？ */
	source: string;
	_sybh: number;
	/** 讨论？ */
	discussing: string;
	/** Unicode 编码 */
	unicode: string;
	/** 两分首部笔画 */
	tailPartStroke: number;
	/** 两分首部拼音 */
	tailPartPinyin: string;
	/** 两分首部 */
	tailPart: string;
	/** 相容尾部 */
	compatiableTailPart: string;
	/** 提交来源 */
	regionSource: string;
	/** 标准字？ */
	standardZi: string;
	/** 字头 */
	zi: string;
	/** 字形 */
	font: string;
	/** 前一字编码 */
	prevCode: string;
	/** 后一字编码 */
	nextCode: string;
	/** 索引 */
	index: ICharResultDataIndex[];
	/** 地区异体 */
	areaVariant: {
		HanNom: VariantsType;
		Sawndip: VariantsType;
	},
	/** 地区 */
	area: {
		HanNom: ICharResultDataAera | null;
		Sawndip: ICharResultDataAera | null;
	},
	/** 异体 */
	variant: VariantsType;
}
//#endregion

const spaceDivide = (...strings: (string | number)[]): string => strings.join(" ");
const getUnicodeChar = (uni: string): string | null => {
	if (!isUnicode(uni) || !isFinite(parseInt(uni, 16))) return null;
	return String.fromCodePoint(parseInt(uni, 16));
}

export default class CharResult extends ResultPage<ICharResultData[]> {
	private get data(): ICharResultData {
		const _data = this.props.data;
		if (!_data || !_data.length) throw new TypeError("Null character result data!");
		return _data[0];
	}
	private get isUnicode(): boolean | undefined {
		return isUnicode(this.data.unicode);
	}
	private getInfoBox(): [string, React.ReactNode][] {
		const data = this.data;
		return [
			["字符集", getZiZone(data.showId, data.unicode)],
			[this.isUnicode ? "统一编码" : "临时编码", data.unicode],
			["可复制字", data.zi],
			["总笔画数", data.stroke],
			["部首余笔", spaceDivide(data.radical, data.strokeRemaining)],
			["两分字元", spaceDivide(data.headPart, data.tailPart)],
			["字形描述", getIds(data.ids)],
			["提交来源", <div className={styles.regionSource}>{getRegionSource(data.regionSource)}</div>],
			["字典索引", getDictIndex(data.index)],
			["参考资料", data.source],
		];
	}
	public render() {
		const data = this.data;
		return (
			<BookPage pages={3}>
				<div className={styles.charResult}>
					<div>
						<CharViewer char={data.zi} canCopied={!!this.isUnicode} />
						<div className={styles.infoBoxArea}>
							<div className={styles.adjacentChars}>
								<div><a className={hyperlinkStyle.waveLink}><Icon icon="angle-left" marginRight />{getUnicodeChar(data.prevCode)}</a></div>
								<div><AccentFont>{data.zi}({data.unicode})</AccentFont></div>
								<div><a className={hyperlinkStyle.waveLink}>{getUnicodeChar(data.nextCode)}<Icon icon="angle-right" marginLeft /></a></div>
							</div>
							<table className={styles.infoBox} width="100%">
								<tbody>
									{this.getInfoBox().map((item, index) => (
										<tr key={`infobox-item-${index}`}>
											<td>{item[0]}</td>
											<td>{item[1]}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div>
						<ExplainingSection area="zisea" explaining={data.explaining} variants={data.variant} />
						<ExplainingSection disable={!data.area.HanNom} area="HanNom" explaining={data.area.HanNom?.explaining} variants={data.areaVariant.HanNom} />
						<ExplainingSection disable={!data.area.Sawndip} area="Sawndip" explaining={data.area.Sawndip?.explaining} variants={data.areaVariant.Sawndip} />
					</div>
				</div>
			</BookPage>
		);
	}
}

function Variants(props: { variants: VariantsType }) {
	if (props.variants.length === 0 || props.variants[0] === null) return null;
	return (
		<Card title="异体字">
			<div className={styles.variants}>
				{props.variants.map((variant, index) => {
					const key = `variant-${index}`, char = getUnicodeChar(variant ?? "");
					if (char) return <a key={key} className={hyperlinkStyle.waveLink}>{char}</a>;
					else return <a key={key} className={hyperlinkStyle.waveLink}>{variant}</a>;
				})}
			</div>
		</Card>
	);
}

function ExplainingSection(props: {
	disable?: boolean;
	area?: string;
	explaining?: string;
	variants?: VariantsType;
}): JSX.Element | null {
	if (props.disable) return null;
	const area = props.area === "zisea" ? "字海" :
		props.area === "HanNom" ? "越南喃字" :
		props.area === "Sawndip" ? "方块壮字" : props.area;
	return (
		<section>
			<SplitLine>{area + "释义"}</SplitLine>
			{props.explaining ? <SectionContent>{stringMarkInternalLink(props.explaining)}</SectionContent> : null}
			{props.variants ? <Variants variants={props.variants} /> : null}
		</section>
	);
}
