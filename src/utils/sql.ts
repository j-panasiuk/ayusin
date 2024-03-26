export function sql(
  strings: TemplateStringsArray,
  ...expressions: string[]
): string {
  let string = "";
  for (let i = 0; i < strings.length; i++) {
    const exp = expressions[i];
    string += strings[i] ?? "";
    string += exp;
  }
  return string;
}
