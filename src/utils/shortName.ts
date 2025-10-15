export function shortName(name: string) {
  const words = name.split(" ");
  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const firstLetter = firstWord.charAt(0).toLocaleUpperCase();

  return `${firstLetter} ${lastWord
    .charAt(0)
    .toLocaleUpperCase()}${lastWord.slice(1)}`;
}
