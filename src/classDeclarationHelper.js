export const getArgsForFunctionGenerator = classDeclaration => {
  if ((classDeclaration || {}).type === "ClassDeclaration") {
    const name = (classDeclaration.id || {}).name || "";

    return {
      name,
      params: ["props"],
      body: getFunctionBodyFromClassDeclarationBody(classDeclaration.body)
    };
  } else {
    throw new TypeError(
      "Invalid type of provided object. Must be of type 'ClassDeclaration'"
    );
  }
};

export const getFunctionBodyFromClassDeclarationBody = classBody => {
  if ((classBody || {}).type === "ClassBody") {
    return classBody.body.map(x => {
      if (x.type === "ClassProperty") {
        return classPropertyToVariableDeclaration(x);
      }
      if (x.type === "ClassMethod") {
        //
      }
      return x;
    });
  }
};

export const classPropertyToVariableDeclaration = classProperty => {
  if ((classProperty || {}).type === "ClassProperty") {
    const name = (classProperty.key || {}).name || "varName";
    const value = classProperty.value;

    return {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name
          },
          init: value
        }
      ],
      kind: "const"
    };
  } else {
    throw new TypeError(
      "Invalid type of provided object. Must be of type 'ClassProperty'"
    );
  }
};
