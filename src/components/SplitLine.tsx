import React from "react";
import styles from "./SplitLine.module.scss";

export default function SplitLine(props: {
	children: string
}) {
	return (
		<fieldset className={styles.splitLine}>
			<legend>{props.children}</legend>
		</fieldset>
	);
}