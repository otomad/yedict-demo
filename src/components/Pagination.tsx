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

const ELLIPSIS = "…";

export default class Pagination extends React.Component<IPaginationProps, IPaginationState> {
	public constructor(props: IPaginationProps) {
		super(props);
		if (props.curPage < 1 || props.pagesCount < 1)
			throw new RangeError("Cannot given prop args less than 1!");
		this.state = {
			pageInput: 0,
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
	private static getRelativeAndEndpointsPages(curPage: number, pagesCount: number, num: number = 7): (number | typeof ELLIPSIS)[] {
		const ret: (number | typeof ELLIPSIS)[] = this.getRelativePages(curPage, pagesCount, num);
		if (ret.length < 5) return ret;
		if (ret[0] !== 1) {
			ret[0] = 1;
			ret[1] = ELLIPSIS;
		}
		if (ret[ret.length - 1] !== pagesCount) {
			ret[ret.length - 1] = pagesCount;
			ret[ret.length - 2] = ELLIPSIS;
		}
		return ret;
	}
	private handleChange = (event: { target: { value: string; }; }) => {
		let num: number = parseInt((event.target.value || "0").replace(/[^0-9]/g, ""));
		if (num > this.props.pagesCount) num = this.props.pagesCount;
		this.setState({ pageInput: num });
	}
	public render(): React.ReactNode {
		return (
			<div className={styles.pagination}>
				{Pagination.getRelativeAndEndpointsPages(this.props.curPage, this.props.pagesCount).map((page, index, array) => (
					<button key={`page-index-${index}`} className={classNames({
						[styles.current]: page === this.props.curPage,
						[styles.ellipsis]: page === ELLIPSIS,
						[styles.beforeEllipsis]: array[index + 1] === ELLIPSIS,
					})} disabled={page === ELLIPSIS}>{page}</button>
				))}
				<input type="text" value={this.state.pageInput >= 1 ? this.state.pageInput : ""} onChange={this.handleChange} placeholder={this.props.curPage.toString()} />
				<button><Icon icon="arrow-right" fixedWidth /></button>
			</div>
		);
	}
}