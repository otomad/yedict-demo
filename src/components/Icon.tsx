import React from "react";
// import "font-awesome/css/font-awesome.css";

type IIconProps = React.HTMLAttributes<HTMLElement> & {
	icon: string;
	fixedWidth?: boolean;
	marginRight?: boolean;
	marginLeft?: boolean;
}

const MARGIN = "0.5rem";

export default function Icon(props: IIconProps): JSX.Element {
	let { icon, fixedWidth, className, marginRight, marginLeft, style, ...htmlProps } = props;
	className ||= "";
	className += " fa fa-" + icon + (fixedWidth ? " fa-fw" : "");
	if (marginRight) style = { ...style, marginRight: MARGIN };
	if (marginLeft) style = { ...style, marginLeft: MARGIN };
	return <i className={className} style={style} {...htmlProps} />
}
