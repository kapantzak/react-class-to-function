import traverse from "@babel/traverse";
import template from "@babel/template";
import * as t from "@babel/types";

export const traverseTree = ast => {
  traverse(ast, {
    ClassMethod: path => {
      if (path.node.kind === "constructor") {
        const state = exportStateOutOfContructor(path.node);
        if (state) {
          path.replaceWithMultiple(state);
        } else {
          path.remove();
        }
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
    const stateProps =
      (stateAssignment.expression.right || {}).properties || [];
    return generateStateHooks(stateProps);
  }
  return null;
};

export const generateStateHooks = props => {
  if (props && Array.isArray(props)) {
    return props.map(prop => generateStateHook(prop));
  }
  return null;
};

export const generateStateHook = prop => {
  const buildRequire = template(`
    const [%%getter%%, %%setter%%] = useState(%%defaultValue%%);
  `);

  const getterName = prop.key.name;
  const setterName = `set${getterName[0].toUpperCase()}${getterName.slice(1)}`;
  return buildRequire({
    getter: t.identifier(getterName),
    setter: t.identifier(setterName),
    defaultValue: prop.value
  });
};

export const memberExpressionIsState = memberExpression => {
  const hasThisExpression =
    ((memberExpression || {}).object || {}).type === "ThisExpression";
  const hasPropertyState =
    ((memberExpression || {}).property || {}).name === "state";
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
