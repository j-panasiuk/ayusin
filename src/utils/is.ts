export function isUndefined(val: unknown): val is undefined {
  return val === undefined;
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === "boolean";
}

export function isNumber(val: unknown): val is number {
  return typeof val === "number";
}

export function isString(val: unknown): val is string {
  return typeof val === "string";
}

export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val?.constructor?.name === "Object";
}
