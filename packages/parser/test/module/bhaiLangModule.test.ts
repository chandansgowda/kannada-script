import { Parser } from "../../src/components/parser";
import Program from "../../src/components/parser/program";
import TokenExecutor from "../../src/components/parser/tokenExecutor";
import Tokenizer from "../../src/components/tokenizer";
import bhaiLangModule from "../../src/module/bhaiLangModule";

test("test bhaiLangModule should success", () => {
  expect(bhaiLangModule.getTokenizer()).toBeInstanceOf(Tokenizer);
  expect(bhaiLangModule.getTokenExecutor()).toBeInstanceOf(TokenExecutor);
  expect(bhaiLangModule.getProgram()).toBeInstanceOf(Program);
  expect(bhaiLangModule.getParser()).toBeInstanceOf(Parser);
});
