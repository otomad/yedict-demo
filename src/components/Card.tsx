import React from "react";
import styles from "./Card.module.scss";

export default (props: React.HTMLAttributes<HTMLFieldSetElement> & {
	title: string
}) => {
	const { className, title, ...otherProps } = props;
	return (
		<fieldset className={`${className} ${styles.card}`} {...otherProps}>
			<legend>{title}</legend>
			{props.children}
		</fieldset>
	);
};