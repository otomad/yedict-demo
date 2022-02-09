import React from "react";
import SplitLine from "@/components/SplitLine";
import Root from "@/components/Root";
import zisea from "@/img/zihai_noborder.svg";
import hyperlinkStyle from "@/style/hyperlink.module.scss";
import QueryTitle from "@/components/QueryTitle";
import Homepage from "@/module/Homepage";
import { ModeType } from "@/components/Navbar";

export default class Char extends Homepage {
	static get mode(): ModeType { return "char"; }
	render() {
		return (
			<article className={this.props.className}>
				<section>
					<SplitLine>使用方法</SplitLine>
					<ol>
						<li>可以直接输入汉字或其编码查解释；</li>
						<li>无法输入的字请使用<a onClick={goToHalfMode} className={hyperlinkStyle.waveLink}>两分</a>等查询。</li>
					</ol>
				</section>
				<section>
					<QueryTitle>【单字查询】收字 13.9 万（13.8 万释义）</QueryTitle>
				</section>
				<section style={{
					display: "flex",
					justifyContent: "center",
				}}>
					<embed src={zisea} type="image/svg+xml" style={{
						borderRadius: "2rem",
						marginBottom: "2rem",
					}} />
				</section>
			</article>
		);
	}
}

function goToHalfMode() {
	Root.r.searchPanel?.navigate("half");
}
