// https://stackoverflow.com/a/46700791
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function filterUndefined<T extends Record<string, unknown>, R>(obj: T): R {
  return Object.fromEntries(Object.entries(obj).filter(notEmpty)) as unknown as R;
}
