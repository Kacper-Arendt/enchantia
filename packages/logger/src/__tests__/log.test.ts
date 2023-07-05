import { logger } from "..";

jest.spyOn(global.console, "log");

describe("logger", () => {
  it("prints a log message", () => {
    logger.log("logger log test =>", "log");
    expect(console.log).toBeCalled();
  });
  
  it("prints a error message", () => {
    logger.error("logger error test =>", "error");
    expect(console.log).toBeCalled();
  });
});
