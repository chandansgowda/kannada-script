#! /usr/bin/env node
import interpreter from "kannada-script-interpreter";
import chalk from "chalk";
import fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

console.info(
  chalk.hex("#FFD700")(`
Kannada-Script Programming Language - Kannadigarinda, Kannadigarigoskara 🔥

Project - https://github.com/chandansgowda/kannada-script
Youtube - https://youtube.com/@EngineeringinKannada
`)
);

const print = (line: string) =>
  console.log(`${chalk.hex("#FFD700")(">  ")}${chalk.greenBright(line)}`);

// Reads one line from stdin synchronously, used by `kelu()`
let pendingInput = "";
let inputEnded = false;
const readLine = (prompt?: string): string | null => {
  if (prompt) process.stdout.write(chalk.hex("#FFD700")(prompt));

  const buffer = Buffer.alloc(1024);
  while (!pendingInput.includes("\n") && !inputEnded) {
    let bytesRead = 0;
    try {
      bytesRead = fs.readSync(0, buffer, 0, buffer.length, null);
    } catch (error) {
      // stdin is non blocking in some terminals, try again
      if ((error as NodeJS.ErrnoException).code === "EAGAIN") continue;
      if ((error as NodeJS.ErrnoException).code === "EOF") bytesRead = 0;
      else throw error;
    }
    if (bytesRead === 0) inputEnded = true;
    pendingInput += buffer.toString("utf8", 0, bytesRead);
  }

  if (!pendingInput && inputEnded) return null;

  const newline = pendingInput.indexOf("\n");
  const line = newline === -1 ? pendingInput : pendingInput.slice(0, newline);
  pendingInput = newline === -1 ? "" : pendingInput.slice(newline + 1);
  return line.replace(/\r$/, "");
};

const filePath = yargs(hideBin(process.argv))
  .usage("Usage: kannadascript <file.kans>")
  .command(
    "<filepath>",
    "Interpret the contents of the specified file and print it to stdout",
    () => {},
    (argv) => {
      console.info(argv);
    }
  )
  .demandCommand(1).argv._[0];

fs.readFile(String(filePath), "utf8", (err, data) => {
  if (err) {
    console.error(chalk.redBright(`File odoke aagilla: ${err.message}`));
    process.exitCode = 1;
    return;
  }
  try {
    interpreter.interpret(data, { print, input: readLine });
  } catch (ex) {
    if (ex instanceof Error) {
      console.error("\n", chalk.redBright(ex.message));
    }
    process.exitCode = 1;
  }
});
