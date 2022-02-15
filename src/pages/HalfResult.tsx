import AccentFont from "@/components/AccentFont";
import IndexItem from "@/components/IndexItem";
import Pagination from "@/components/Pagination";
import ResultPage from "@/module/ResultPage";
import React from "react";
import styles from "@/components/IndexItem.module.scss";
import stringMarkInternalLink from "@/module/stringMarkInternalLink";

interface IHalfResultData {
	mode: "half";
	query: string;
	charCount: number;
	pagesCount: number;
	currentPage: number;
	list: {
		char: string;
		explain: string;
	}[];
};

export default class HalfResult extends ResultPage<IHalfResultData> {
	public render() {
		return (
			<div>
				<p>
					您输入的查询条件&nbsp;=&nbsp;
					<AccentFont>{this.props.data?.query}</AccentFont>
					&nbsp;的汉字：共&nbsp;
					{this.props.data?.charCount}
					&nbsp;个汉字，
					{this.props.data?.pagesCount}
					&nbsp;页，现为第&nbsp;
					{this.props.data?.currentPage}
					&nbsp;页。
				</p>
				<div className={styles.indexList}>
					{this.props.data?.list?.map((item, i) =>
						<IndexItem head={item.char ?? ""} key={`item-${i}`}>{stringMarkInternalLink(item.explain)}</IndexItem>
					)}
				</div>
				<Pagination curPage={this.props.data?.currentPage ?? 1} pagesCount={this.props.data?.pagesCount ?? 1} />
			</div>
		);
	}
}
