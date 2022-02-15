import classNames from "@/../node_modules/classnames/index";
import React from "react";
import styles from "./CharViewer.module.scss";

interface CharViewerProps {
	char: string;
	canCopied: boolean;
}

interface CharViewerState {
	isCopied: boolean;
}

export default class CharViewer extends React.Component<CharViewerProps, CharViewerState> {
	public constructor(props: CharViewerProps) {
		super(props);
		this.state = {
			isCopied: false,
		};
	}
	private static copy(text: string): void {
		const input = document.createElement("textarea");
		input.value = text;
		input.style.opacity = String(0);
		document.body.append(input);
		input.select();
		document.execCommand("copy");
		input.remove();
	}
	private onClickCopy = () => {
		if (!this.props.canCopied || this.state.isCopied) return;
		CharViewer.copy(this.props.char);
		this.setState({ isCopied: true });
		setTimeout(() => { this.setState({ isCopied: false }); }, 2000);
	}
	public render(): React.ReactNode {
		return (
			<div className={styles.charViewer}>
				<div className={styles.grid}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div className={styles.char}>{this.props.char}</div>
				</div>
				<button className={classNames({
					[styles.copyButton]: true,
					[styles.isCopied]: this.state.isCopied,
				})} disabled={!this.props.canCopied} onClick={this.onClickCopy}>{this.props.canCopied ? this.state.isCopied ? "已复制" : "复制字符" : "只有图片，无法复制"}</button>
			</div>
		);
	}
}