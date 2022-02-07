import AccentFont from "@/components/AccentFont";
import { ModeType } from "@/components/Navbar";
import SectionContent from "@/components/SectionContent";
import SplitLine from "@/components/SplitLine";
import Homepage from "@/module/Homepage";
import React from "react";
import hyperlinkStyle from "@/style/hyperlink.module.scss";
import { DOWNLOAD_PAGE_LINK } from "@/components/Header";

export default class Half extends Homepage {
	static get mode(): ModeType { return "half"; }
	render() {
		return (
			<article>
				<section>
					<SplitLine>两分查字</SplitLine>
					<SectionContent>
						输入或点击：汉字的
						<AccentFont>首尾</AccentFont>
						两部分
						<br />
						支持
						<AccentFont>汉字</AccentFont>
						、
						<AccentFont>拼音</AccentFont>
						、
						<AccentFont>笔画数</AccentFont>
					</SectionContent>
				</section>
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
				<SectionContent>
					<p><b>了解更多两分规则请参考<a href={DOWNLOAD_PAGE_LINK} className={hyperlinkStyle.waveLink}>下载页面</a>的【两分手册】</b></p>
				</SectionContent>
			</article>
		);
	}
}