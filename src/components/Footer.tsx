import classNames from "@/../node_modules/classnames/index";
// import hasScrollbar from "@/module/hasScrollbar";
import React from "react";
import styles from "./Footer.module.scss";
import Root from "./Root";

interface IFooterState {
	bottomFixed: boolean,
	hidden: boolean,
}

export default class Footer extends React.Component<{}, IFooterState> {
	public constructor(props = {}) {
		super(props);
		Root.r.footer = this;
		this.state = {
			bottomFixed: true,
			hidden: false,
		};
		window.addEventListener("scroll", this.isScrollable);
		window.addEventListener("resize", this.isScrollable);
		window.addEventListener("load", this.isScrollable);
		Root.r.addBelowHeaderScrollListener(this.isScrollable);
	}
	public static links: ILinks[] = [
		["关于我们", "./about.html"],
		["字海大事记", "./about.html"],
		["支持我们", "./support.html"],
		["留言板", "http://www.zisea.com/tous/list.asp"],
	];
	public setHidden = (hidden: boolean) => {
		this.setState({ hidden });
	}
	public isScrollable = (): boolean => {
		const belowHeader = Root.r.belowHeader.current;
		if (!belowHeader) return false;
		const scrollable: boolean = belowHeader.offsetHeight !== belowHeader.scrollHeight;
		this.setState({
			bottomFixed: !scrollable
		});
		return scrollable;
	}
	public render() {
		return (
			<footer className={classNames({
				[styles.footer]: true,
				[styles.bottomFixed]: this.state.bottomFixed,
				[styles.hidden]: this.state.hidden && !this.state.bottomFixed,
			})}>
				<div>原创网站，敬请查阅！</div>
				<div>
					<Links className={styles.links} links={Footer.links} />
				</div>
			</footer>
		);
	}
}

type ILinks = [string, string];

interface ILinksProps {
	links: ILinks[];
	className?: string
}

function Links(props: ILinksProps) {
	return (
		<ul className={props.className}>
			{props.links.map((link, i) =>
				<li key={`link-${i}`}>
					<a href={link[1]}>{link[0]}</a>
				</li>
			)}
		</ul>
	);
}
