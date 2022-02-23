global.console = {
  log: jest.fn(), // console.log are ignored in tests
  error: jest.fn(), // console.error are ignored in tests
  warn: jest.fn(), // console.warn are ignored in tests
  info: jest.fn(), // console.info are ignored in tests
  debug: jest.fn(), // console.debug are ignored in tests
};
