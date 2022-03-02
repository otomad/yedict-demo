import React from "react";
import styles from "./Card.module.scss";

export default (props: React.HTMLAttributes<HTMLDivElement> & {
	title: string
}) => {
	const { className, title, ...otherProps } = props;
	return (
		<div className={`${className} ${styles.card}`} {...otherProps}>
			<h4>{title}</h4>
			{props.children}
		</div>
	);
};