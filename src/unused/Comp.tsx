import React from "react";
import styles from "./comp.module.scss";

const Comp = () => {
	const list: string[] = ["1", "abc"];
	let peekValue: string;
	peekValue = list.pop() as string;
	return (
		<div className={styles.wrap}>
			<div className={styles.head}>这是COMP组件</div>
			<div className={styles.body}>测试使用</div>
		</div>
	);
};

export default Comp;
