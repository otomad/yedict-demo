import React from "react";
import IChildrenOnly from "@/module/IChildrenOnly";

export default function SectionContent(props: IChildrenOnly) {
	return (
		<div style={{
			margin: "1rem"
		}}>{props.children}</div>
	);
}