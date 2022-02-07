const config = require("./webpack.config");
const path = require("path");
const isRule = (regExp, testExt) => !!regExp.exec(testExt);

config.mode = "production";
for (const rule of config.module.rules) {
	if (isRule(rule.test, ".scss")) {
		for (const loader of rule.use)
			if (Object.prototype.toString.call(loader) === "[Object Object]" &&
				loader.loader === "sass-loader") {
				loader.options.sassOptions.outputStyle = "compressed";
				break;
			}
		break;
	}
}
config.output.path = path.resolve(__dirname, "docs");


module.exports(config);