import React from "react";
import ReactDOM from "react-dom";
import bgpic from "@/components/BgPic.module.scss";

import Header from "./Header";
import SearchPanel from "./SearchPanel";
import Footer from "./Footer";
import Container from "./Container";

interface IRootState {
	scrollVar: number;
}

export default class Root extends React.Component<{}, IRootState> {
	//#region 基础组件部分
	public header?: Header = undefined;
	public searchPanel?: SearchPanel = undefined;
	public container?: Container = undefined;
	public footer?: Footer = undefined;
	//#endregion

	//#region 根元素声明部分
	private static root?: Root = undefined;
	public belowHeader!: React.RefObject<HTMLDivElement>;
	public static get r(): Root {
		if (Root.root === undefined) throw new ReferenceError("Please init the root first!");
		return Root.root;
	}
	private constructor(props: {}) {
		super(props);
		if (Root.root !== undefined) return Root.root;
		Root.root = this;
		this.state = {
			scrollVar: 0,
		};
		this.belowHeader = React.createRef<HTMLDivElement>();
		window.addEventListener("scroll", this.scrollBgPic);
		window.addEventListener("resize", this.scrollBgPic);
	}
	public static init(): void {
		ReactDOM.render(<Root />, document.getElementById("root"));
	}
	public scrollBgPic = () => {
		const belowHeader = this.belowHeader.current;
		if (!belowHeader) return;
		const scrollY = belowHeader.scrollTop;
		let scrollVar = scrollY;
		if (scrollVar !== 0) scrollVar /= belowHeader.scrollHeight - belowHeader.clientHeight;
		this.setState({ scrollVar });
		this.belowHeaderScrollListener.forEach(listener => listener());
	}
	private belowHeaderScrollListener: (() => void)[] = [];
	public addBelowHeaderScrollListener(listener: () => void) {
		this.belowHeaderScrollListener.push(listener);
	}
	public render(): React.ReactNode {
		return (
			<>
				<Header />
				<div onScroll={this.scrollBgPic} ref={this.belowHeader}>
					<div className={bgpic.bgpic} style={{ "--scroll-var": this.state.scrollVar }} />
					<SearchPanel />
					<Container />
					<Footer />
				</div>
			</>
		);
	}
	//#endregion
}
