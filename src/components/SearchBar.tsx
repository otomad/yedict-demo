import React from "react";
import styles from "./SearchBar.module.scss";

export default class SearchBar extends React.Component {
	public render() {
		return (
			<div className={styles.searchBar}>
				<input type="text" />
				<button>查询</button>
			</div>
		);
	}
}