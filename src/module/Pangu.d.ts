export declare class Pangu {
	Pangu: typeof Pangu;
	static length: number;
	blockTags: RegExp;
	default: Pangu;
	ignoredTags: RegExp;
	isAutoSpacingPageExecuted: boolean;
	presentationalTags: RegExp;
	spaceLikeTags: RegExp;
	spaceSensitiveTags: RegExp;
	version: string;
	
	spacing(text: string): string;
	autoSpacingPage();
	canIgnoreNode(node);
	BrowserPangu();
	isContentEditable(node);
	isFirstTextChild(parentNode, targetNode);
	isInsideSpecificTag(node, tagRegex);
	isLastTextChild(parentNode, targetNode);
	isSpecificTag(node, tagRegex);
	spacingElementByClassName(className);
	spacingElementById(idName);
	spacingElementByTagName(tagName);
	spacingNode(contextNode);
	spacingNodeByXPath(xPathQuery, contextNode);
	spacingPage();
	spacingPageBody();
	spacingPageTitle();
}

declare const pangu: Pangu;
export default pangu;
