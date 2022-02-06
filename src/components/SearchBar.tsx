import classNames from "@/../node_modules/classnames/index";
import React from "react";
import styles from "./SearchBar.module.scss";

interface ISearchBarProps {
	placeholder?: string;
}

interface ISearchBarState {
	isFocusSearchBar: boolean;
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
	public constructor(props: ISearchBarProps) {
		super(props);
		this.state = {
			isFocusSearchBar: false,
		};
	}
	private onFocusSearchBar = (isFocus: boolean) => {
		this.setState({
			isFocusSearchBar: isFocus,
		});
	}
	public render() {
		return (
			<div className={classNames({
				[styles.searchBar]: true,
				[styles.focus]: this.state.isFocusSearchBar,
			})}>
				<input
					type="text"
					placeholder={this.props.placeholder}
					onFocus={() => this.onFocusSearchBar(true)}
					onBlur={() => this.onFocusSearchBar(false)}
				/>
				<button>
					<div className={styles.buttonFace}>
						<span>查询</span>
					</div>
				</button>
			</div>
		);
	}
}
