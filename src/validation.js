import fs from "fs";
import path from "path";
import { ask } from "./ask";

export const validateArgs = async argv => {
  const filePath = argv.path;
  const output = argv.out || path.join(process.cwd(), "output.js");

  // --path: The file to convert
  if (!filePath) {
    throw new Error("Please provide a valid file path with --path option");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} cannot be found`);
  }

  // --out: The output path
  if (!fs.existsSync(output)) {
    fs.writeFileSync(output);
  } else {
    const answer = await ask(
      `File ${output} already exists. Whould you like to overwrite its contents? (Y/N) `
    );
    if (answer.trim().toLowerCase() === "n") {
      console.log("Stopping execution...");
      process.exit();
    }
  }

  return {
    filePath,
    output
  };
};
