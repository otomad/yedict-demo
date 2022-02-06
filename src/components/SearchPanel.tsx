import React from "react";
import Root from "./Root";
import Navbar, * as NavbarTypes from "./Navbar";
import SearchBar from "./SearchBar";

interface ISearchPanelState {
	curMode: NavbarTypes.ModeType;
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
	public navigate(mode: NavbarTypes.ModeType) {
		this.setState({
			curMode: mode
		});
	}
	public static getModeCaption(mode: NavbarTypes.ModeType): NavbarTypes.ModeCaptionType {
		return Navbar.modes.get(mode) as NavbarTypes.ModeCaptionType;
	}
	public render() {
		return (
			<div>
				<Navbar curMode={this.state.curMode} parent={this} />
				<SearchBar placeholder={SearchPanel.getModeCaption(this.state.curMode)} />
			</div>
		);
	}
}