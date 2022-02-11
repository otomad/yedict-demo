import classNames from "@/../node_modules/classnames/index";
import React from "react";
import Icon from "./Icon";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
	curPage: number;
	pagesCount: number;
}

interface IPaginationState {
	pageInput: number;
}

export default class Pagination extends React.Component<IPaginationProps, IPaginationState> {
	public constructor(props: IPaginationProps) {
		super(props);
		if (props.curPage < 1 || props.pagesCount < 1)
			throw new RangeError("Cannot given prop args less than 1!");
		this.state = {
			pageInput: 1,
		};
	}
	/**
	 * 指定输出相关联的几个页码。
	 * @param curPage - 当前页码。
	 * @param pagesCount - 页码总数。
	 * @param num - 需要输出几个页码。
	 */
	private static getRelativePages(curPage: number, pagesCount: number, num: number = 3): number[] {
		if (curPage < 1 || pagesCount < 1 || num < 1 || curPage > pagesCount)
			throw new RangeError("Please input correct number!");
		if (num > pagesCount) num = pagesCount;
		const _ = {
			min: curPage - Math.floor((num - 1) / 2),
			get max() { return this.min + num - 1; },
			set max(value: number) { this.min = value + 1 - num; },
		}
		if (_.min < 1) _.min = 1;
		if (_.max > pagesCount) _.max = pagesCount;
		const ret: number[] = [];
		for (let i = _.min; i <= _.max; i++) ret.push(i);
		return ret;
	}
	private handleChange = (event: { target: { value: string; }; }) => {
		const num: number = parseInt((event.target.value || "0").replace(/[^0-9]/g, ""))
		this.setState({ pageInput: num });
	}
	public render(): React.ReactNode {
		return (
			<div className={styles.pagination}>
				<button><Icon icon="angle-double-left" fixedWidth /></button>
				<button><Icon icon="angle-left" fixedWidth /></button>
				{Pagination.getRelativePages(this.props.curPage, this.props.pagesCount).map((page, index) =>
					<button key={`page-index-${index}`} className={classNames({
						[styles.current]: page === this.props.curPage
					})}>{page}</button>
				)}
				<button><Icon icon="angle-right" fixedWidth /></button>
				<button><Icon icon="angle-double-right" fixedWidth /></button>
				<input type="text" value={this.state.pageInput} onChange={this.handleChange} />
				<button><Icon icon="arrow-right" fixedWidth /></button>
			</div>
		);
	}
}