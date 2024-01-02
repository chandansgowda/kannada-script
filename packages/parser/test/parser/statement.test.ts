import Statement from "../../src/components/parser/statement";
import BlockStatement from "../../src/components/parser/statement/blockStatement";
import { TokenTypes } from "../../src/constants/kannadascriptSpec";
import kannadascriptModule from "../../src/module/kannadascriptModule";

jest.mock("../../src/module/kannadascriptModule");

const blockStatementMock = new (<any>(
  BlockStatement
))() as jest.Mocked<BlockStatement>;

afterEach(() => {
  jest.clearAllMocks();
});

test("test getStatementImpl of statement class with should success", () => {
  const lookahead = {
    type: TokenTypes.OPEN_CURLY_BRACE_TYPE,
    value: "{",
  };

  kannadascriptModule.getBlockStatement = jest
    .fn()
    .mockReturnValue(blockStatementMock);

  expect(Statement.getStatementImpl(lookahead)).toStrictEqual(
    blockStatementMock
  );

  expect(kannadascriptModule.getBlockStatement).toHaveBeenCalledTimes(1);
});
