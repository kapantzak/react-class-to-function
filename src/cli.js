import fs from "fs";
import { parse } from "@babel/parser";
import generator from "@babel/generator";
import { validateArgs } from "./validation";

module.exports.cli = async argv => {
  const { filePath, output } = await validateArgs(argv);

  fs.readFile(filePath, "utf8", (err, contents) => {
    if (err) {
      throw new Error(err);
    }
    const ast = parse(contents, {
      sourceType: "module",
      plugins: ["jsx"]
    });
    // const body = ((ast || {}).program || {}).body || [];
    // for (const node of body) {
    //   console.log(node.type);
    // }
    const result = generator(ast);
    const code = result.code || "";
    try {
      fs.writeFileSync(output, code, "utf8");
      console.log("Success");
    } catch (e) {
      console.error(e);
    }
  });
};
