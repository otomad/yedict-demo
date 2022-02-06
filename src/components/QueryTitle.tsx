import React from "react";

export default function QueryTitle(props: {
	children: string
}) {
	return (
		<h3 style={{
			textAlign: "center",
		}}>{props.children}</h3>
	);
}
