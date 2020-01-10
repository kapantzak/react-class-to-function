import fs from "fs";
import path from "path";
import readline from "readline";
import { parse } from "@babel/parser";
import generator from "@babel/generator";

module.exports.cli = async argv => {
  const filePath = argv.path;
  const output = argv.out || path.join(process.cwd(), "output.js");

  // --path: The file to convert
  if (!filePath) {
    throw new Error("Please provide a valid file path with --path option");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} cannot be found`);
  }

  // --out
  if (!fs.existsSync(output)) {
    fs.writeFileSync(output);
  } else {
    const answer = await ask(
      `File ${output} already exists. Whould you like to overwrite its contents? (Y/N) `
    );
    if (answer.trim().toLowerCase() === "n") {
      console.log("Stopping execution...");
      return;
    }
  }

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

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(res =>
    rl.question(question, answer => {
      rl.close();
      res(answer);
    })
  );
}
