import React from "react";
import SplitLine from "@/components/SplitLine";
import QueryTitle from "@/components/QueryTitle";
import IChildrenOnly from "@/module/IChildrenOnly";
import SectionContent from "@/components/SectionContent";
import styles from "./Idiom.module.scss";
import Homepage from "@/module/Homepage";
import { ModeType } from "@/components/Navbar";

export default class Idiom extends Homepage {
	static mode: ModeType = "idiom";
	render() {
		return (
			<article className={this.props.className}>
				<SplitLine>使用方法</SplitLine>
				<SectionContent>
					<section>
						输入成语中的汉字，未知的用
						<AccentFont>?</AccentFont>
						和
						<AccentFont>*</AccentFont>
						代替。
					</section>
					<section>
						<QueryTitle>【成语查询】收录成语或词语。共计九万多条。</QueryTitle>
					</section>
					<section>
						<table className={styles.idiomExample} width="100%">
							<tbody>
								<tr>
									<td>字？？？</td>
									<td width="100%">表示一个四字成语，已知第一字，每个问号 ? 表示任意一个汉字。</td>
								</tr>
								<tr>
									<td>＊字＊</td>
									<td>星号 * 表示任意个汉字，前后都有星号，表示成语中含有这个汉字。</td>
								</tr>
								<tr>
									<td>？字字＊</td>
									<td>星号 * 表示任意个汉字，前后都有星号，表示成语中含有这个汉字。</td>
								</tr>
							</tbody>
						</table>
					</section>
				</SectionContent>
			</article>
		);
	}
}

function AccentFont(props: IChildrenOnly) {
	return (
		<span style={{
			color: "var(--primary-color)",
			padding: "0 0.25em",
		}}>{props.children}</span>
	);
}