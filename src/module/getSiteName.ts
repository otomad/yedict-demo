function getSiteName() {
	const host: string = location.host;
	const test = (domain: string): boolean => host.includes(domain);
	if (test("yedict")) return "葉典";
	else if (test("rendao")) return "人道";
	else return "字海";
}

export default getSiteName();
