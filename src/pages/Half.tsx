import AccentFont from "@/components/AccentFont";
import { ModeType } from "@/components/Navbar";
import SectionContent from "@/components/SectionContent";
import SplitLine from "@/components/SplitLine";
import Homepage from "@/module/Homepage";
import React from "react";
import hyperlinkStyle from "@/style/hyperlink.module.scss";
import { DOWNLOAD_PAGE_LINK } from "@/components/Header";
import Card from "@/components/Card";
import IChildrenOnly from "@/module/IChildrenOnly";
import halfIndex from "@/data/half-index";
import initialsFinalsIndex from "@/data/initials-finals-index";
import Root from "@/components/Root";
import indexTableStyles from "@/components/IndexTable.module.scss";

export default class Half extends Homepage {
	static get mode(): ModeType { return "half"; }
	render() {
		return (
			<article className={this.props.className}>
				<section>
					<SplitLine>两分查字</SplitLine>
					<SectionContent>
						输入或点击：汉字的
						<AccentFont>首尾</AccentFont>
						两部分。
						<br />
						支持
						<AccentFont>汉字</AccentFont>
						、
						<AccentFont>拼音</AccentFont>
						、
						<AccentFont>笔画数</AccentFont>
						。
					</SectionContent>
				</section>
				<Card title="难检字元">
					<table className={indexTableStyles.indexTable}>
						<tbody>
							{halfIndex.map((row, i) =>
								<tr key={`row-${i}`}>
									<td>{row[0]}</td>
									<td>
										{row[1].map((cell, i) => {
											const BRACKETS = /\(.*\)/g;
											const caption = cell.replace(BRACKETS, "");
											let text = cell;
											const match = cell.match(BRACKETS);
											if (match) text = match[0].slice(1, -1);
											const appendValue = (): void => Root.r.searchPanel?.appendValue(text);
											return <button key={`cell-${i}`} onClick={appendValue}>{caption}</button>;
										})}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Card>
				<Card title="拼音">
					<table className={indexTableStyles.indexTable}>
						<tbody>
							{initialsFinalsIndex.map((row, i) =>
								<tr key={`row-${i}`}>
									<td>{row[0]}</td>
									<td>
										{row[1].map((cell, i) => {
											const caption = cell;
											const text = cell.match(/[A-Za-z]+/)![0];
											const appendValue = (): void => Root.r.searchPanel?.appendValue(text);
											return <button key={`cell-${i}`} onClick={appendValue}>{caption}</button>;
										})}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Card>
				<section>
					<SplitLine>使用说明</SplitLine>
					<SectionContent>
						<ol>
							{[
								"?=任意字元(? 月) 卐=难拆字元(卐 2)",
								"余笔支持数字(4 tu)、比较符号(zhi >30)、连接符“-”(>25 2-5)。两分之外也可加余笔(金 金 8)。",
								"字元分隔可用空格、逗号、加号。(氵,十,>5)",
								"字元界限可辨时可不加分隔符(2-4水、shui<6、艹mu6-8、土木>8)",
							].map((line, i) => <li key={`line-${i}`}>{line}</li>)}
						</ol>
					</SectionContent>
				</section>
				<section>
					<SplitLine>示例</SplitLine>
					<SectionContent>
						<ul style={{ listStyleType: "disclosure-closed" }}>
							<HalfExample char="菅" part1="艹" part2="官">查字时，可以直接输入汉字两个部分的字元</HalfExample>
							<HalfExample char="菅" part1="cao" part2="guan">也可以输入字元的拼音，两拼音间最好加空格</HalfExample>
							<HalfExample char="菅" part1="3" part2="8">也可以输入字元的笔画，两笔画间最好加空格</HalfExample>
							<HalfExample char="数" part1="娄" part2="wen">首部“娄”，尾部“攵”的拼音</HalfExample>
							<HalfExample char="偏" part1="亻" part2="9">首部“亻”，尾部“扁”的笔画</HalfExample>
							<HalfExample char="馨" part1="sheng" part2="香">首部“声”的拼音，尾部“香”</HalfExample>
							<HalfExample char="街" part1="xing" part2="6">首部“行”的拼音，尾部“圭”的笔画</HalfExample>
							<HalfExample char="衷" part1="6" part2="中">首部“衣”的笔画，尾部“中”</HalfExample>
							<HalfExample char="国" part1="3" part2="yu">首部“囗”的笔画，尾部“玉”的拼音</HalfExample>
							<HalfExample char="器" part1="?" part2="犬">首部不知道怎么输入用<AccentFont>问号?</AccentFont>代替，尾部“犬”</HalfExample>
							<HalfExample char="醽" part1="you" part2=">16">查找首部“酉”的拼音，剩余笔画<AccentFont>大于16</AccentFont>的全部汉字</HalfExample>
						</ul>
					</SectionContent>
				</section>
				<SectionContent>
					<p><b>了解更多两分规则请参考<a href={DOWNLOAD_PAGE_LINK} className={hyperlinkStyle.waveLink}>下载页面</a>的【两分手册】</b></p>
				</SectionContent>
			</article>
		);
	}
}

function HalfExample(props: {
	char: string,
	part1: string,
	part2: string,
	children: React.ReactNode,
}) {
	const notesStyle = {
		margin: "0 2rem",
	};
	return (
		<li>
			<strong>{props.char}</strong>
			<UserSelectless>：</UserSelectless>
			{props.part1}
			<UserSelectless>&nbsp;</UserSelectless>
			{props.part2}
			<blockquote style={notesStyle}>{props.children}</blockquote>
		</li>
	);
}

function UserSelectless(props: IChildrenOnly) {
	return <span style={{ userSelect: "none" }}>{props.children}</span>;
}
