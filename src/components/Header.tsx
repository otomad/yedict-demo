import React from "react";
import Root from "./Root";
import styles from "./Header.module.scss";
import "font-awesome/css/font-awesome.css";
import theme from "@/module/night-time";
import siteName from "@/module/get-site-name";
// import logo from "@/img/logo.svg";
import Logo from "@/components/Logo";

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

interface IIconProps extends React.HTMLAttributes<HTMLElement> {
	icon?: string;
	fixedWidth?: boolean;
}

function Icon(props: IIconProps): JSX.Element {
	if (!props.icon) throw new TypeError("Icon prop is required!");
	const iconClass: string = `fa fa-${props.icon}` + (props.fixedWidth ? " fa-fw" : "");
	const className: string = props.className ? `${props.className} ${iconClass}` : iconClass;
	const htmlProps: IIconProps = { ...props, className };
	delete htmlProps.icon;
	delete htmlProps.fixedWidth;
	return <i {...htmlProps} />;
}

function goToDownloadPage(): void {
	location.href = "http://cheonhyeong.com/Simplified/download.html";
}