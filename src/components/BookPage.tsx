import React from "react";
import styles from "./BookPage.module.scss";

interface IBookPageProps {
	pages: number;
	children?: React.ReactNode;
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
		function nest(item?: React.ReactNode): JSX.Element {
			let className: string | undefined = props.className ?? "";
			if (remain === 1 && props.outerClassName)
				className += " " + props.outerClassName;
			remain--;
			if (className === "") className = undefined;
			const inner: JSX.Element = <div className={className}>{item}</div>;
			return remain > 0 ? nest(inner) : inner;
		}
		return nest(props.children);
	}
	protected static defaultProps: Partial<IBookPageProps> = {
		className: styles.bookPage,
		outerClassName: styles.bookPageOuter,
	};
}