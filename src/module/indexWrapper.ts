export default function indexWrapper(indexRaw: [string, string][], sep: string = ",") {
	const index: [string, string[]][] = [];
	for (const row of indexRaw)
		index.push([row[0], row[1].replace(new RegExp(sep + "+", "g"), sep).trim().split(sep)]);
	return index;
}
