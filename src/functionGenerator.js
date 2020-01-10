export const generateFunction = ({ name, params, body }) => {
  return {
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name
    },
    params: generateFunctionParams(params),
    body: generateFunctionBody(body)
  };
};

export const generateFunctionParams = params =>
  params.map(p => ({
    type: "Identifier",
    name: p
  }));

export const generateFunctionBody = body => ({
  type: "BlockStatement",
  body: body
});
