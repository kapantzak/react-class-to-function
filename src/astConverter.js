import { getArgsForFunctionGenerator } from "./classDeclarationHelper";
import { generateFunction } from "./functionGenerator";

export const convertAst = ast => {
  const body = ((ast || {}).program || {}).body || [];
  let convertedBody = [];
  for (const node of body) {
    let nodeToCopy = node;
    if (node.type === "ClassDeclaration") {
      nodeToCopy = convertClassToFunction(node);
    }
    convertedBody.push(nodeToCopy);
  }
  const convertedAst = JSON.parse(JSON.stringify(ast));
  convertedAst.program.body = convertedBody;
  return convertedAst;
};

export const convertClassToFunction = classDeclaration => {
  const functionGeneratorArgs = getArgsForFunctionGenerator(classDeclaration);
  return generateFunction(functionGeneratorArgs);
};
