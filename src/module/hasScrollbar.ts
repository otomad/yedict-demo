export default function hasScrollbar() {
	return document.documentElement.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}
