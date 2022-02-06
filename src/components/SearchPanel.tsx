import React from "react";
import Root from "./Root";
import Navbar, * as NavBarTypes from "./Navbar";
import SearchBar from "./SearchBar";

interface ISearchPanelState {
	curMode: NavBarTypes.ModeType;
}

export default class SearchPanel extends React.Component<{}, ISearchPanelState> {
	public navBar?: Navbar = undefined;
	public constructor(props = {}) {
		super(props);
		Root.r.searchPanel = this;
		this.state = {
			curMode: "char"
		};
	}
	public navigate(mode: NavBarTypes.ModeType) {
		this.setState({
			curMode: mode
		});
	}
	public render() {
		return (
			<div>
				<Navbar curMode={this.state.curMode} parent={this} />
				<SearchBar />
			</div>
		);
	}
}