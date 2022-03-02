import React from "react";
import Root, { ContainerType } from "./Root";
import Navbar, * as NavbarTypes from "./Navbar";
import SearchBar from "./SearchBar";
import { LoadingStatus } from "./Loading";
import urlState from "@/module/UrlState";
declare var $: any;

interface ISearchPanelState {
	curMode: NavbarTypes.ModeType;
}

const urlStateKey = {
	mode: "m",
	query: "q",
};

export default class SearchPanel extends React.Component<{}, ISearchPanelState> {
	public navBar?: Navbar = undefined;
	public searchBar?: SearchBar = undefined;
	public constructor(props = {}) {
		super(props);
		Root.r.searchPanel = this;
		this.state = {
			curMode: "char"
		};
		window.addEventListener("load", this.readUrlState);
		window.addEventListener("popstate", this.readUrlState);
	}
	public navigate(mode: NavbarTypes.ModeType) {
		this.setState({
			curMode: mode
		});
		Root.r.setContainerType(ContainerType.HOMEPAGE);
		Root.r.container?.changeMode(mode);
		if (!this.isPopState) urlState.inject(urlStateKey.mode, mode);
		setTimeout(() => { Root.r.footer?.isScrollable(); }, 0);
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
		if (!(this.searchBar && this.searchBar.getValue)) return;
		const value: string = this.searchBar.getValue().toUpperCase().trim();
		if (!value) return;
		const hexRegExp = /[0-9a-f]+/;
		switch (this.state.curMode) {
			/* case "half":
				deal(`http://www.zisea.com/api/getZi?ziCode=${}`);
				break; */
			case "char":
				let code: string;
				const matchHex = value.match(hexRegExp);
				if (matchHex && matchHex[0] === value) code = matchHex[0];
				else code = (value.codePointAt(0) as number).toString(16);
				// deal(`http://www.zisea.com/api/getZi?ziCode=${code}`);
				deal("./getZi.json");
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
		if (!this.isPopState) urlState.inject({
			[urlStateKey.mode]: this.state.curMode,
			[urlStateKey.query]: this.searchBar?.getValue(),
		});
	}
	private isPopState: boolean = false;
	public inquire = (mode: NavbarTypes.ModeType, keyword?: string | null) => {
		this.isPopState = true;
		this.navigate(mode);
		if (keyword) {
			this.setValue(keyword);
			this.query();
		}
		this.isPopState = false;
	}
	private readUrlState = () => {
		let mode = urlState.get(urlStateKey.mode) as NavbarTypes.ModeType;
		if (mode === null || !Navbar.modes.has(mode)) {
			console.error("Load mode failed!");
			mode = "char";
		}
		const query = urlState.get(urlStateKey.query);
		this.inquire(mode, query);
	}
}