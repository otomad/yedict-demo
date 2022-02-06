import React from "react";
import styles from "./Footer.module.scss";

export default class Footer extends React.Component {
	public static links: ILinks[] = [
		["关于我们", "./about.html"],
		["字海大事记", "./about.html"],
		["支持我们", "./support.html"],
		["留言板", "http://www.zisea.com/tous/list.asp"],
	];
	public render() {
		return (
			<footer className={styles.footer}>
				<div>原创网站，敬请查阅！</div>
				<div>
					<Links className={styles.links} links={Footer.links} />
				</div>
			</footer>
		);
	}
}

type ILinks = [string, string];

interface ILinksProps {
	links: ILinks[];
	className?: string
}

function Links(props: ILinksProps) {
	return (
		<ul className={props.className}>
			{
				props.links.map((link, i) =>
					<li key={`link-${i}`}>
						<a href={link[1]}>{link[0]}</a>
					</li>
				)
			}
		</ul>
	);
}