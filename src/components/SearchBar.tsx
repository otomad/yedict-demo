import classNames from "@/../node_modules/classnames/index";
import React from "react";
import styles from "./SearchBar.module.scss";
import SearchPanel from "./SearchPanel";

interface ISearchBarProps {
	placeholder?: string;
	parent: SearchPanel;
}

interface ISearchBarState {
	isFocusSearchBar: boolean;
	value: string;
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
	inputRef: React.RefObject<HTMLInputElement>;
	public constructor(props: ISearchBarProps) {
		super(props);
		this.props.parent.searchBar = this;
		this.state = {
			isFocusSearchBar: false,
			value: "",
		};
		this.inputRef = React.createRef<HTMLInputElement>();
		window.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === "Enter" && this.state.isFocusSearchBar)
				this.query();
		});
	}
	private onFocusSearchBar = (isFocus: boolean) => {
		this.setState({ isFocusSearchBar: isFocus, });
	}
	private handleChange = (event: { target: { value: string; }; }) => {
		this.setState({ value: event.target.value });
	}
	public setValue = (value: string) => {
		this.setState({ value });
	}
	public appendValue = (value: string) => {
		this.setState({ value: this.state.value + value });
		this.inputRef.current?.focus();
	}
	public getValue = () => this.state.value;
	public query = () => this.props.parent.query();
	public render() {
		return (
			<div className={styles.limitWidth}>
				<div className={classNames({
					[styles.searchBar]: true,
					[styles.focus]: this.state.isFocusSearchBar,
				})}>
					<input
						type="text"
						placeholder={this.props.placeholder}
						onFocus={() => this.onFocusSearchBar(true)}
						onBlur={() => this.onFocusSearchBar(false)}
						value={this.state.value}
						onChange={this.handleChange}
						ref={this.inputRef}
					/>
					<button onClick={this.query}>
						<div className={styles.buttonFace}>
							<span>查询</span>
						</div>
					</button>
				</div>
			</div>
		);
	}
}
