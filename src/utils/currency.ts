import Big from "big.js";

Big.DP = 2;
Big.RM = Big.roundHalfEven;

type Cents = number;

export const toCent = (amount: number): Cents => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid input for toCent: Must be a valid number.");
  }
  return new Big(amount).mul(100).toNumber() as Cents;
};

export const fromCent = (amount: Cents): number => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid input for fromCent: Must be a valid number.");
  }
  return new Big(amount).div(100).round(2).toNumber();
};

export const toCurrencyFromCent = (
  amount: Cents,
  locale: string = "en-US",
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(fromCent(amount));
};
