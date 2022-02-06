type EventFunc = (isDark?: boolean) => void;
const events: EventFunc[] = [];

const theme = {
	get isDark(): boolean {
		return !!(document.documentElement.dataset.theme &&
			document.documentElement.dataset.theme.trim().toLowerCase() === "dark")
	},
	set isDark(value: boolean) {
		document.documentElement.dataset.theme = value ? "dark" : "light";
	},
	addEvents: (...funcs: EventFunc[]): void => {
		events.push(...funcs);
	},
	removeEvents: (...funcs: EventFunc[]): number => {
		let successfulCount: number = 0;
		for (const func of funcs) {
			const index = events.indexOf(func);
			if (index === -1) continue;
			events.splice(index, 1);
			successfulCount++;
		}
		return successfulCount;
	}
};

let hour: number = new Date().getHours();
const PREFERS_DARK: string = "(prefers-color-scheme: dark)";
if (hour < 7 || hour >= 19 || // 晚上 7 点到次日早上 7 点启动深色主题。
	matchMedia(PREFERS_DARK).matches) // 若浏览器开启了深色主题，也会启动深色主题。
	theme.isDark = true;

matchMedia(PREFERS_DARK).addEventListener(
	"change", mediaQueryList => theme.isDark = mediaQueryList.matches
);

export default theme;
