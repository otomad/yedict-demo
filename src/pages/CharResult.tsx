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

//#region interfaces
interface IAdjacentChar {
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
}
//#endregion

export default class CharResult extends ResultPage<ICharResultData> {
	public render() {
		const data = this.props.data;
		if (!data) throw new TypeError("Null character result data!");
		return (
			<BookPage pages={3}>
				<div className={styles.charResult}>
					<div>
						<CharViewer char={data.char} canCopied={data.isUnicode} />
						<div className={styles.infoBoxArea}>
							<div className={styles.adjacentChars}>
								<div><a className={hyperlinkStyle.waveLink}><Icon icon="angle-left" marginRight />{data.prevChar.char}</a></div>
								<div><AccentFont>{data.char}({data.code})</AccentFont></div>
								<div><a className={hyperlinkStyle.waveLink}>{data.nextChar.char}<Icon icon="angle-right" marginLeft /></a></div>
							</div>
							<table className={styles.infoBox} width="100%">
								<tbody>
									<tr>
										<td colSpan={2}>{data.area}</td>
									</tr>
									<tr>
										<td>{data.isUnicode ? "Unicode" : "非 Unicode 临时码"}</td>
										<td>{data.code}</td>
									</tr>
									<tr>
										<td>总笔画数</td>
										<td>{data.strokes}</td>
									</tr>
									<tr>
										<td>部首余笔</td>
										<td>{data.radical}</td>
									</tr>
									<tr>
										<td>两分字元</td>
										<td>{data.half}</td>
									</tr>
									<tr>
										<td>字形描述</td>
										<td>{data.ids}</td>
									</tr>
									<tr>
										<td>提交来源</td>
										<td>{data.source}</td>
									</tr>
									<tr>
										<td>中华字海</td>
										<td>{data.cnzisea}</td>
									</tr>
									<tr>
										<td>参考资料</td>
										<td>{data.reference}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div>
						{data.explain.map((explain, index) => {
							const sourceCaption = new Map<string, string>([
								["zisea", "字海释义"],
								["vietnamese", "越南字释义"],
								["korean", "韩国释义"],
							]);
							return (
								<section key={`explain-${index}`}>
									<SplitLine>{sourceCaption.get(explain.source) ?? `${explain.source}释义`}</SplitLine>
									<SectionContent>{stringMarkInternalLink(explain.content)}</SectionContent>
									{explain.variants ? <Variants variants={explain.variants} /> : null}
								</section>
							);
						})}
					</div>
				</div>
			</BookPage>
		);
	}
}

function Variants(props: { variants: VariantsType[] }) {
	return (
		<Card title="异体字">
			<div className={styles.variants}>
				{props.variants.map((variant, index) => (
					<a key={`variant-${index}`}>
						{typeof variant === "string" ? variant :
							<img src={variant.pic} />}
					</a>
				))}
			</div>
		</Card>
	);
}