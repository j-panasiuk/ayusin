const NEWLINE_WITH_LEADING_WHITESPACES = /\n\s+/g;

export function html(
  strings: TemplateStringsArray,
  ...expressions: (undefined | number | string | string[])[]
): string {
  let string = "";
  for (let i = 0; i < strings.length; i++) {
    const exp = expressions[i];
    string += strings[i] ?? "";
    string += (Array.isArray(exp) ? exp.join("") : exp) ?? "";
  }
  return string.replaceAll(NEWLINE_WITH_LEADING_WHITESPACES, "\n");
}
