import IHiddenOnly from "@/module/IHiddenOnly";
import ResultPage from "@/module/ResultPage";
import CharResult from "@/pages/CharResult";
import HalfResult from "@/pages/HalfResult";
import React from "react";
import { ModeType } from "./Navbar";
import Root from "./Root";

interface IResult {
	mode?: ModeType;
}

interface IResultState {
	data?: IResult;
}

export default class Result extends React.Component<IHiddenOnly, IResultState> {
	public constructor(props: IHiddenOnly) {
		super(props);
		this.state = {
			data: undefined
		};
		Root.r.result = this;
	}
	private static map = new Map<ModeType, typeof ResultPage>([
		["half", HalfResult],
		["char", CharResult],
	]);
	public setData = (data: IResult) => {
		this.setState({ data });
	}
	public render(): React.ReactNode {
		const nothing = <div />;
		// const mode = this.state.data?.mode;
		// if (!mode) return nothing;
		const mode = Root.r.searchPanel?.state.curMode as ModeType;
		const R = Result.map.get(mode);
		if (!R || !this.state.data) return nothing;
		return (
			<div hidden={this.props.hidden} style={{
				margin: "1rem"
			}}>
				<R data={this.state.data} />
			</div>
		);
	}
}