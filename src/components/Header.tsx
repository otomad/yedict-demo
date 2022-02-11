import React from "react";
import Root from "./Root";
import styles from "./Header.module.scss";
import theme from "@/module/NightTime";
import siteName from "@/module/getSiteName";
import Logo from "@/components/Logo";
import Icon from "./Icon";
import classNames from "@/../node_modules/classnames/index";

type ThemeType = "light" | "dark";

interface IHeaderState {
	curTheme: ThemeType;
	showSearch: boolean;
}

export default class Header extends React.Component<{}, IHeaderState> {
	public constructor(props: {}) {
		super(props);
		Root.r.header = this;
		this.state = {
			curTheme: this.getTheme(),
			showSearch: false,
		};
		theme.addEvents(this.updateTheme);
		Root.r.addBelowHeaderScrollListener(this.setHeaderSearchBarVisible);
	}
	private changeTheme = () => {
		theme.isDark = !theme.isDark;
		this.updateTheme();
	};
	private updateTheme = () => {
		this.setState({
			curTheme: this.getTheme(),
		});
	};
	private getTheme(): ThemeType {
		return theme.isDark ? "dark" : "light";
	}
	private static themeRes = {
		light: {
			title: "浅色主题",
			icon: "sun-o",
		},
		dark: {
			title: "深色主题",
			icon: "moon-o",
		},
	};
	private onClickHeaderSearchBarHandler = (): void => Root.r.searchPanel?.focusSearchBar();
	private setHeaderSearchBarVisible = () => {
		const isSearchBarVisible: boolean = (Root.r.searchPanel?.searchBar?.inputRef.current?.getBoundingClientRect().top ?? 0) > 0;
		this.setState({
			showSearch: !isSearchBarVisible
		});
	}
	public render(): React.ReactNode {
		return (
			<header className={styles.header}>
				<div>
					<span id="title" className={styles.ziseaLogo}>
						<Logo className={styles.logo} />
						{siteName}
					</span>
					<div className={classNames({
						[styles.headerSearch]: true,
						[styles.show]: this.state.showSearch,
					})}>
						<div onClick={this.onClickHeaderSearchBarHandler}>
							<Icon icon="search" />
						</div>
					</div>
				</div>
				<div>
					<button
						title={Header.themeRes[this.state.curTheme].title}
						onClick={this.changeTheme}
					>
						<Icon icon={Header.themeRes[this.state.curTheme].icon} fixedWidth />
					</button>
					<button title="下载" onClick={goToDownloadPage}>
						<Icon icon="download" fixedWidth />
					</button>
				</div>
			</header>
		);
	}
}

export var DOWNLOAD_PAGE_LINK = "http://cheonhyeong.com/Simplified/download.html";

export function goToDownloadPage(): void {
	location.href = DOWNLOAD_PAGE_LINK;
}
