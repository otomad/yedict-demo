const config = require("./webpack.config");
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

module.exports(config);