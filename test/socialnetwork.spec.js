describe("validator", () => {

  it("la función de login debe ser global", () => {
    assert.isFunction(login);
  });

  describe("login(email, password)", () => {
    let email = "usuario@correo.com";
    let password = "654321";
    let regExpress = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validator = login(email, password);

    it("debe retornar objeto con propiedades email y password", () => {
      assert.ok(validator.hasOwnProperty("email"));
      assert.ok(validator.hasOwnProperty("password"));
    });

    it("debe retornar propiedad email=true y password=true para validar", () => {
      assert.equal(validator.email, true);
      assert.equal(validator.password, true);
    });
  });

  it("la función de register debe ser global", () => {
    assert.isFunction(register);
  });

  describe("register(email, password)", () => {
    let email = "usuario@correo.com";
    let password = "654321";
    let regExpress = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validator = register(email, password);

    it("debe retornar objeto con propiedades email y password", () => {
      assert.ok(validator.hasOwnProperty("email"));
      assert.ok(validator.hasOwnProperty("password"));
    });

    it("debe retornar propiedad email=true y password=true para validar", () => {
      assert.equal(validator.email, true);
      assert.equal(validator.password, true);
    });
  });


});