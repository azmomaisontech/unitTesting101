const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

//Numbers
describe("absolute", () => {
  it("Expect result to be a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("Expect result to be a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("Expect result to be zero if input is zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

//Strings
describe("greet", () => {
  it("Should return a greeting if a name string is passed", () => {
    const result = lib.greet("Moses");
    expect(result).toMatch(/Moses/);
  });
});

//Arrays
describe("getCurrencies", () => {
  it("Should check if it contains all supported currency", () => {
    const input = ["EUR", "USD", "AUD"];
    const result = lib.getCurrencies();

    expect(result).toEqual(expect.arrayContaining(input));
  });
});

//Objects
describe("getProduct", () => {
  it("Should return a product object if the correct id of the product is passed in", () => {
    const result = lib.getProduct(1);

    //Two ways and both are good.
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

//To throw errors
describe("registerUser", () => {
  it("Should throw an error if username is falsy", () => {
    //Falsy values = [Null, NaN, 0, false, "", undefined]

    const args = [null, NaN, 0, false, "", undefined];
    args.forEach(arg => {
      expect(() => {
        lib.registerUser(arg);
      }).toThrow();
    });
  });

  it("Should return an object with id and the username if valid username is passed", () => {
    const result = lib.registerUser("moses123");
    expect(result).toMatchObject({ username: "moses123" });
    expect(result.id).toBeGreaterThan(0);
  });
});

//Using  Mock Functions to create a fake simulation
describe("applyDiscount", () => {
  it("Should apply a 10% discount to the total price if a customer has about 10 points ", () => {
    db.getCustomerSync = jest.fn(id => ({ id, points: 20 }));

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);

    expect(order.totalPrice).toBe(9);
  });
});

//Using  mock functions to create a fake simulation
describe("notifyCustomer", () => {
  it("Should notify customer after they have successfully placed an Order", () => {
    db.getCustomerSync = jest.fn(id => ({ email: "a" }));
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/successfully/);
  });
});
