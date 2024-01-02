import { Parser } from "../../src/components/parser";
import Program from "../../src/components/parser/program";
import TokenExecutor from "../../src/components/parser/tokenExecutor";
import Tokenizer from "../../src/components/tokenizer";
import kannadascriptModule from "../../src/module/kannadascriptModule";

test("test kannadascriptModule should success", () => {
  expect(kannadascriptModule.getTokenizer()).toBeInstanceOf(Tokenizer);
  expect(kannadascriptModule.getTokenExecutor()).toBeInstanceOf(TokenExecutor);
  expect(kannadascriptModule.getProgram()).toBeInstanceOf(Program);
  expect(kannadascriptModule.getParser()).toBeInstanceOf(Parser);
});
