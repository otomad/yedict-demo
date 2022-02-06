import React from "react";
import styles from "./Navbar.module.scss";
import classNames from "@/../node_modules/classnames/index";
import SearchPanel from "./SearchPanel";

export type ModeType = "char" | "idiom" | "half" | "radical" | "pron" | "singlecomp" | "backcasting" | "cnzisea" | "grandcndict" | "charset";
export type ModeCaptionType = "单字" | "成语" | "两分" | "部首" | "拼音" | "独体" | "反查" | "中华字海" | "汉语大字典" | "字符集";

interface INavbarProps {
	curMode?: ModeType;
	parent: SearchPanel;
}

export default class Navbar extends React.Component<INavbarProps, {}> {
	public static modes = new Map<ModeType, ModeCaptionType>([
		["char", "单字"],
		["idiom", "成语"],
		["half", "两分"],
		["radical", "部首"],
		["pron", "拼音"],
		["singlecomp", "独体"],
		["backcasting", "反查"],
		["cnzisea", "中华字海"],
		["grandcndict", "汉语大字典"],
		["charset", "字符集"],
	]);
	public static get navs(): ModeCaptionType[] {
		return [...Navbar.modes.values()];
	}
	public constructor(props: INavbarProps) {
		super(props);
		props.parent.navBar = this;
	}
	private navigate = (mode: ModeType) => this.props.parent.navigate(mode);
	public render() {
		return (
			<nav className={styles.navbar}>
				{[...Navbar.modes.entries()].map((nav, i) => {
					const mode = nav[0],
						modeCaption = nav[1];
					return (
						<div
							key={`nav-link-${i}`}
							className={classNames({
								[styles.navItem]: true,
								[styles.active]: mode === this.props.curMode,
							})}
							onClick={() => this.navigate(mode)}
						>
							{modeCaption}
						</div>
					);
				})}
			</nav>
		);
	}
	public static defaultProps: Partial<INavbarProps> = {
		curMode: "char",
	};
}
