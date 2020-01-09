const fs = require("fs");
const babelParser = require("@babel/parser");

module.exports.cli = argv => {
  const filePath = argv.path;
  const output = argv.out || process.cwd();

  // --path: The file to convert
  if (!filePath) {
    throw new Error("Please provide a valid file path with --path option");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} cannot be found`);
  }

  // --out
  if (!fs.existsSync(output)) {
    throw new Error("Please provide a valid output path with --out option");
  }

  fs.readFile(filePath, "utf8", (err, contents) => {
    if (err) {
      throw new Error(err);
    }
    const ast = babelParser.parse(contents, {
      sourceType: "module",
      plugins: ["jsx"]
    });
    const body = ((ast || {}).program || {}).body || [];
    for (const node of body) {
      console.log(node.type);
    }
  });
};
