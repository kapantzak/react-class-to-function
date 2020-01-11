import traverse from "@babel/traverse";

export const traverseTree = ast => {
  traverse(ast, {
    ClassMethod: path => {
      if (path.node.kind === "constructor") {
        const state = exportStateOutOfContructor(path.node);
      }
    },
    ThisExpression: path => {
      if (path.parent.type == "MemberExpression") {
        const identifier = convertMemberExpressionToIdentifier(path.parent);
        path.parentPath.replaceWith(identifier);
      }
    }
  });
};

export const exportStateOutOfContructor = ctor => {
  const body = ctor.body.body;
  const stateAssignment = body.find(x => {
    const expression = x.expression;
    const isAssignment = expression.type === "AssignmentExpression";
    const isEqualOperator = expression.operator === "=";
    const leftIsState = memberExpressionIsState(expression.left);
    return isAssignment && isEqualOperator && leftIsState;
  });
  if (stateAssignment) {
    const stateProps = x.expression.right;
    // --> get object props
  }
  return ctor;
};

export const memberExpressionIsState = memberExpression => {
  const hasThisExpression =
    ((memberExpression.object || {}).object || {}).type === "ThisExpression";
  const hasPropertyState = memberExpression.property.name === "state";
  return hasThisExpression && hasPropertyState;
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
