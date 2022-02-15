import React from "react";
import hyperlinkStyle from "@/style/hyperlink.module.scss";
import pangu from "@/module/Pangu";

export default function stringMarkInternalLink(str: string): JSX.Element {
	str = pangu.spacing(str).trim().replaceAll("\r", "");
	const arr: React.ReactNode[] = str.replaceAll("\n", "\r\n\r").split("\r");
	for (let i = 0; i < arr.length; i++) {
		const para = arr[i];
		if (para === "\n")
			arr[i] = <br key={`br-${i}`} />;
		if (typeof para === "string" && para.match("【")) {
			arr[i] = para.replace(/【([^】]+)】/g, "【\n\r$1\n】").split("\n");
			{
				const para = arr[i] as React.ReactNode[];
				for (let j = 0; j < para.length; j++) {
					const word = para[j];
					if (typeof word === "string" && word[0] === "\r")
						para[j] = <a key={`a-${i}-${j}`} className={hyperlinkStyle.waveLink}>{word.slice(1)}</a>;
				}
			}
		}
	}
	return <>{arr.flat()}</>;
}
