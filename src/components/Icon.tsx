import React from "react";
import "font-awesome/css/font-awesome.css";

type IIconProps = React.HTMLAttributes<HTMLElement> & {
	icon: string;
	fixedWidth?: boolean;
}

export default function Icon(props: IIconProps): JSX.Element {
	let { icon, fixedWidth, className, ...htmlProps } = props;
	className ||= "";
	className += " fa fa-" + icon + (fixedWidth ? " fa-fw" : "");
	return <i className={className} {...htmlProps} />
}
