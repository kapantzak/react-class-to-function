import readline from "readline";

export const ask = question => {
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
};
