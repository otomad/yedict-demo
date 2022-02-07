import React from "react";
import IChildrenOnly from "@/module/IChildrenOnly";

export default function AccentFont(props: IChildrenOnly & {
	paddingSurround?: boolean
}) {
	let style = {
		color: "var(--primary-color)",
		padding: props.paddingSurround ? "0 0.25em" : undefined,
	};
	return (
		<span style={style}>{props.children}</span>
	);
}
