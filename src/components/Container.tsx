import React from "react";
import Root from "./Root";
import "./BgPic.scss";
import styles from "./Container.module.scss";
import Navbar, { ModeType } from "./Navbar";
import Homepage from "@/module/Homepage";

//#region Pages
import Char from "@/pages/Char";
import Idiom from "@/pages/Idiom";
//#endregion

enum CompareModeResult {
	LESS = -1,
	EQUAL = 0,
	MORE = 1,
}

interface IContainerState {
	curMode: ModeType;
	leftMode?: ModeType;
	rightMode?: ModeType;
}

export default class Container extends React.Component<{}, IContainerState> {
	public constructor(props: {}) {
		super(props);
		Root.r.container = this;
		this.state = {
			curMode: "char",
			leftMode: undefined,
			rightMode: undefined,
		};
	}
	private static homepages: typeof Homepage[] = [
		Char, Idiom
	];
	public changeMode = async (mode: ModeType) => {
		const curMode = this.state.curMode;
		if (curMode === mode) return;
		const compare: CompareModeResult = Container.compareMode(mode, curMode);
		this.setState({
			leftMode: compare === CompareModeResult.LESS ? mode : undefined,
			curMode: curMode,
			rightMode: compare === CompareModeResult.MORE ? mode : undefined,
		});
		await new Promise(resolve => setTimeout(() => {
			this.setState({
				leftMode: compare === CompareModeResult.MORE ? curMode : undefined,
				curMode: mode,
				rightMode: compare === CompareModeResult.LESS ? curMode : undefined,
			});
			resolve(true);
		}, 10));
		await new Promise(resolve => setTimeout(() => {
			this.setState({
				leftMode: undefined,
				curMode: mode,
				rightMode: undefined,
			});
			resolve(true);
		}, 250));
	}
	public static compareMode(mode1: ModeType, mode2: ModeType): CompareModeResult {
		const getIndex = (mode: ModeType) => [...Navbar.modes.keys()].indexOf(mode);
		const index1 = getIndex(mode1), index2 = getIndex(mode2);
		return noMinusZero(Math.sign(index1 - index2));
	}
	public render() {
		return (
			<div className={styles.container}>
				{Container.homepages.map((Homepage, i) => {
					const key = `homepage-${i}`;
					if (Homepage.mode === this.state.curMode)
						return <Homepage key={key} />;
					if (Homepage.mode === this.state.rightMode)
						return <Homepage key={key} className={styles.hideRight} />;
					if (Homepage.mode === this.state.leftMode)
						return <Homepage key={key} className={styles.hideLeft} />;
				})}
			</div>
		);
	}
}

/**
 * 将数字处理为不为 -0（负零）的值。
 * @param n - 输入的数字。
 * @returns 不为 -0 的数字。
 */
function noMinusZero(n: number): number {
	return Object.is(n, -0) ? 0 : n;
}
