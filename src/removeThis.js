import traverse from "@babel/traverse";

export const findThisExpressions = ast => {
  traverse(ast, {
    ThisExpression: path => {
      if (path.parent.type == "MemberExpression") {
        const identifier = convertMemberExpressionToIdentifier(path.parent);
        path.parentPath.replaceWith(identifier);
      }
    }
  });
};

export const convertMemberExpressionToIdentifier = memberExpression => {
  if ((memberExpression || {}).type === "MemberExpression") {
    const name = (memberExpression.property || {}).name;
    return {
      type: "Identifier",
      name
    };
  } else {
    throw new TypeError(
      `Invalid type of provided object (${
        (memberExpression || {}).type
      }). Must be of type 'MemberExpression'`
    );
  }
};
