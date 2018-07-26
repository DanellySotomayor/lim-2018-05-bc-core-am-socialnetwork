describe("data", () => {

  // function register
  it("backToLogin debe función", () => {
    assert.isFunction(backToLogin);
  });

  it("createAccount debe función", () => {
    assert.isFunction(createAccount);
  });

  it("register debe función", () => {
    assert.isFunction(register);
  });

  it("login debe función", () => {
    assert.isFunction(login);
  });

  it("facebookLogin debe función", () => {
    assert.isFunction(facebookLogin);
  });

  it("googleLogin debe función", () => {
    assert.isFunction(googleLogin);
  });

  it("closeModal debe función", () => {
    assert.isFunction(closeModal);
  });

  it("recoverPassword debe función", () => {
    assert.isFunction(recoverPassword);
  });

});