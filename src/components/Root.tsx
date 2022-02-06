import React from "react";
import ReactDOM from "react-dom";
import bgpic from "@/components/BgPic.module.scss";

import Header from "./Header";
import SearchPanel from "./SearchPanel";

const bgpicStyle = {
	position: "fixed",
	zIndex: -1,
	right: "3rem",
	bottom: "3rem",
	opacity: 0.5,
	userSelect: "none",
};

export default class Root extends React.Component {
	//#region 基础组件部分
	public header?: Header = undefined;
	public searchPanel?: SearchPanel = undefined;
	//#endregion

	//#region 根元素声明部分
	private static root?: Root = undefined;
	public static get r(): Root {
		if (Root.root === undefined) throw new ReferenceError("Please init the root first!");
		return Root.root;
	}
	private constructor(props: {}) {
		super(props);
		if (Root.root !== undefined) return Root.root;
		Root.root = this;
	}
	public static init(): void {
		ReactDOM.render(<Root />, document.getElementById("root"));
	}
	public render(): React.ReactNode {
		return (
			<>
				<Header />
				<SearchPanel />
				𰻞𰻞面
				<div className={bgpic.bgpic} />
			</>
		);
	}
	//#endregion
}
