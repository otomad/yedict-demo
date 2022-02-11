import IChildrenOnly from "@/module/IChildrenOnly";
import React from "react";
import styles from "./IndexItem.module.scss";

export default function IndexItem(props: IChildrenOnly & {
	head: string;
}) {
	return (
		<div className={styles.indexItem}>
			<div className={styles.head}><a>{props.head}</a></div>
			<div>{props.children}</div>
		</div>
	);
}