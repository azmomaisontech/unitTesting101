const exercise = require("../exercise1");

describe("fizzBuzz", () => {
  it("Should throw Error if input is not a number", () => {
    expect(() => {
      exercise.fizzBuzz("Moses");
    }).toThrow();
    expect(() => {
      exercise.fizzBuzz(null);
    }).toThrow();
    expect(() => {
      exercise.fizzBuzz(undefined);
    }).toThrow();
  });

  it("Should return FizzBuzz if input % 3 === 0 and input % 5 === 0", () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("Should return Fizz if input % 3 === 0", () => {
    const result = exercise.fizzBuzz(9);
    expect(result).toBe("Fizz");
  });

  it("Should return FizzBuzz if input % 5 === 0", () => {
    const result = exercise.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("Should return input if input is not divisible by 3 or 5", () => {
    const result = exercise.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
