import React from "react";

interface IBookPageProps {
	pages: number;
	children?: JSX.Element;
	className?: string;
	outerClassName?: string;
}

export default class BookPage extends React.Component<IBookPageProps, {}> {
	public constructor(props: IBookPageProps) {
		if (props.pages <= 0) throw new RangeError("Cannot set the pages prop less than or equal to 0!");
		super(props);
	}
	public render() {
		const props = this.props;
		let remain = props.pages;
		function nest(item?: JSX.Element): JSX.Element {
			let className: string = props.className ?? "";
			if (remain === props.pages && props.outerClassName)
				className += " " + props.outerClassName;
			remain--;
			const inner: JSX.Element = <div className={className}>{item}</div>;
			return remain > 0 ? nest(inner) : inner;
		}
		return nest(props.children);
	}
}