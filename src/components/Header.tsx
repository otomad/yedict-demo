import React from "react";
import Root from "./Root";
import styles from "./Header.module.scss";
import theme from "@/module/NightTime";
import siteName from "@/module/getSiteName";
// import logo from "@/img/logo.svg";
import Logo from "@/components/Logo";
import Icon from "./Icon";

type ThemeType = "light" | "dark";

interface IHeaderState {
	curTheme: ThemeType;
}

export default class Header extends React.Component<{}, IHeaderState> {
	public constructor(props: {}) {
		super(props);
		Root.r.header = this;
		this.state = {
			curTheme: this.getTheme(),
		};
		theme.addEvents(this.updateTheme);
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
	public render(): React.ReactNode {
		return (
			<header className={styles.header}>
				<div>
					<span id="title" className={styles.ziseaLogo}>
						{/* <embed src={logo} /> */}
						<Logo className={styles.logo} />
						{siteName}
					</span>
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
