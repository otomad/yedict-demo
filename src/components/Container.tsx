import React from "react";
import Root from "./Root";
import styles from "./Container.module.scss";
import Navbar, { ModeType } from "./Navbar";
import Homepage from "@/module/Homepage";

//#region Pages
import Char from "@/pages/Char";
import Idiom from "@/pages/Idiom";
import classNames from "@/../node_modules/classnames/index";
import Half from "@/pages/Half";
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
	isTransiting: boolean;
}

export default class Container extends React.Component<{}, IContainerState> {
	public constructor(props: {}) {
		super(props);
		Root.r.container = this;
		this.state = {
			curMode: "char",
			leftMode: undefined,
			rightMode: undefined,
			isTransiting: false,
		};
	}
	private static homepages: typeof Homepage[] = [
		Char, Idiom, Half,
	];
	private ChangeMode = class ChangeMode {
		public static list: ChangeMode[] = [];
		private container: Container;
		public constructor(container: Container) {
			this.container = container;
		}
		public async changeMode(mode: ModeType) {
			ChangeMode.list.forEach(item => item.forceStop = true);
			ChangeMode.list.push(this);
			const curMode = this.container.state.curMode;
			const NEXT = 10;
			if (curMode === mode) return;
			const compare: CompareModeResult = Container.compareMode(mode, curMode);
			if (compare === CompareModeResult.EQUAL) console.warn("???");
			const setFootHidden = (hidden: boolean): void => {
				Root.r.footer?.setHidden(hidden);
			};
			const step = (action: () => void, ms: number = 0): Promise<unknown> => {
				return new Promise(resolve => setTimeout(() => {
					if (!this.forceStop) action();
					resolve(true);
				}, ms));
			}
			this.container.setState({
				leftMode: compare === CompareModeResult.LESS ? mode : undefined,
				curMode: curMode,
				rightMode: compare === CompareModeResult.MORE ? mode : undefined,
				isTransiting: true,
			});
			setFootHidden(true);
			if (!this.forceStop) await step(() => {
				this.container.setState({
					leftMode: compare === CompareModeResult.MORE ? curMode : undefined,
					curMode: mode,
					rightMode: compare === CompareModeResult.LESS ? curMode : undefined,
					isTransiting: true,
				});
			}, NEXT);
			if (!this.forceStop) await step(() => {
				this.container.setState({
					leftMode: undefined,
					curMode: mode,
					rightMode: undefined,
					isTransiting: false,
				});
			}, parseInt(styles.tabTransitionDuration));
			if (!this.forceStop) await step(() => {
				Root.r.footer?.isScrollable();
				setFootHidden(false);
			}, NEXT);
			const index = ChangeMode.list.indexOf(this);
			if (index !== -1) ChangeMode.list.splice(index, 1);
		}
		public forceStop: boolean = false;
	}
	public changeMode = async (mode: ModeType) => {
		new this.ChangeMode(this).changeMode(mode);
	}
	public static compareMode(mode1: ModeType, mode2: ModeType): CompareModeResult {
		const getIndex = (mode: ModeType) => [...Navbar.modes.keys()].indexOf(mode);
		const index1 = getIndex(mode1), index2 = getIndex(mode2);
		return noMinusZero(Math.sign(index1 - index2));
	}
	public get isTransiting(): boolean {
		return this.state.isTransiting;
	}
	public render() {
		return (
			<div className={classNames({
				[styles.container]: true,
				[styles.transiting]: this.state.isTransiting
			})}>
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
