import React from "react";
import Root, { ContainerType } from "./Root";
import Navbar, * as NavbarTypes from "./Navbar";
import SearchBar from "./SearchBar";
import { LoadingStatus } from "./Loading";

interface ISearchPanelState {
	curMode: NavbarTypes.ModeType;
}

export default class SearchPanel extends React.Component<{}, ISearchPanelState> {
	public navBar?: Navbar = undefined;
	public searchBar?: SearchBar = undefined;
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
		Root.r.setContainerType(ContainerType.HOMEPAGE);
		Root.r.container?.changeMode(mode);
	}
	public static getModeCaption(mode: NavbarTypes.ModeType): NavbarTypes.ModeCaptionType {
		return Navbar.modes.get(mode) as NavbarTypes.ModeCaptionType;
	}
	public setValue = (value: string): void => this.searchBar?.setValue(value);
	public appendValue = (value: string): void => this.searchBar?.appendValue(value);
	public focusSearchBar = (): void => this.searchBar?.inputRef.current?.focus();
	public render() {
		return (
			<div>
				<Navbar curMode={this.state.curMode} parent={this} />
				<SearchBar placeholder={SearchPanel.getModeCaption(this.state.curMode)} parent={this} />
			</div>
		);
	}
	public query = () => {
		switch (this.state.curMode) {
			case "half":
				deal("json/half-test.json");
				break;
			case "char":
				deal("json/char-test.json");
				break;
			default:
				break;
		}
		function deal(path: string) {
			Root.r.setContainerType(ContainerType.LOADING);
			Root.r.loading?.setStatus(LoadingStatus.LOADING);
			Root.r.footer?.isScrollable();
			fetch(path)
				.then(response => response.json())
				.then(data => {
					Root.r.setContainerType(ContainerType.RESULT);
					Root.r.result?.setData(data);
					Root.r.footer?.isScrollable();
				})
				.catch(e => {
					Root.r.loading?.setStatus(LoadingStatus.FAILED, e);
					Root.r.footer?.isScrollable();
				});
		}
	}
}