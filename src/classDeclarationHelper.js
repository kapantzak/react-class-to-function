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
        return checkClassMethodName(x);
      }
      return x;
    });
  }
};

export const checkClassMethodName = classMethod => {
  const name = ((classMethod || {}).key || {}).name || null;
  switch (name) {
    case "render":
      return renderMethodToReturnStatement(classMethod);
    case "componentDidMount":
      return componentDidMountToUseEffect(classMethod);
    default:
      return null;
  }
};

export const renderMethodToReturnStatement = classMethod => {
  const body = (classMethod || {}).body;
  if (body && body.type === "BlockStatement") {
    const returnStatement = (body.body || []).find(
      x => x.type === "ReturnStatement"
    );
    if (returnStatement) {
      return removeMemberExpressionsFromReturnStatement(returnStatement);
    } else {
      throw new Error("No return statement found inside render method");
    }
  } else {
    throw new Error("Class method's body should be of type 'BlockStatement'");
  }
};

export const removeMemberExpressionsFromReturnStatement = returnStatement => {
  if ((returnStatement || {}).type === "ReturnStatement") {
    const newReturnStatement = JSON.parse(JSON.stringify(returnStatement));
    newReturnStatement.argument = removeMemberExpressionsFromOpeningElements([
      newReturnStatement.argument
    ])[0];
    return newReturnStatement;
  } else {
    throw new TypeError(
      "Invalid type of provided object. Must be of type 'ReturnStatement'"
    );
  }
};

export const removeMemberExpressionsFromOpeningElements = jsxElements => {
  return jsxElements.map(jsxElement => {
    if (jsxElement.type === "JSXElement") {
      const openingElement = jsxElement.openingElement;
      openingElement.attributes = transformOpeningElementAttributes(
        openingElement
      );
      const children = jsxElement.children;
      if ((children || []).length > 0) {
        jsxElement.children = removeMemberExpressionsFromOpeningElements(
          children
        );
      }
    }
    return jsxElement;
  });
};

export const transformOpeningElementAttributes = openingElement => {
  return openingElement.attributes.map(x => {
    if ((x.value || {}).type === "JSXExpressionContainer") {
      return memberToSimpleExpression(x);
    }
    return x;
  });
};

export const memberToSimpleExpression = jsxAttribute => {
  if (
    (jsxAttribute || {}).type === "JSXAttribute" &&
    ((jsxAttribute || {}).value || {}).type === "JSXExpressionContainer"
  ) {
    return {
      type: jsxAttribute.type,
      name: jsxAttribute.name,
      value: {
        type: jsxAttribute.value.type,
        expression: {
          type: "Identifier",
          name: jsxAttribute.value.expression.property.name
        }
      }
    };
  } else {
    throw new TypeError(
      "Invalid type of provided object. Must be of type 'JSXAttribute'"
    );
  }
};

export const componentDidMountToUseEffect = classMethod => {
  return null;
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
