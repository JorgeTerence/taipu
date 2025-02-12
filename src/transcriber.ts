import {hiragana, katakana, Row} from "./alphabets.ts";

const TenTenMapping: Record<string, string> = {g: "k", z: "s", d: "t", b: "h"};
const MaruMapping: Record<string, string> = {"p": "h"};

function isVowel(char: string) {
  return ["a", "i", "u", "e", "o"].includes(char);
}

let alphabet = hiragana;

export function setupAlphabetPicker(toggle: HTMLInputElement, from: HTMLInputElement) {
  toggle.addEventListener("change", () => {
    if (toggle.checked) alphabet = katakana;
    else alphabet = hiragana;
    from.value += "";
  });
}

export function setupTranscriber(from: HTMLInputElement, to: HTMLParagraphElement) {
  from.addEventListener("input", () => {
    to.innerText = transcribeRomaji(from.value);
    /*
    * $YA -> $I + ya
    * YOU -> yo + U
    * F? -> FU + ?
    * V? -> U" + ?
    * J? -> SHI" + ?
    * */
  });
}

function transcribeRomaji(romaji: string) {
  let result = "";
  let consonant = "_";
  let doubleConsonant = false;

  romaji = romaji
    .replaceAll("tsu", "tu")
    .replaceAll("shi", "si")
    .replaceAll("ji", "zi")
    .replaceAll("dzu", "du")
    .replaceAll("fu", "hu");

  for (const char of romaji) {
    if (isVowel(char)) {
      if (doubleConsonant) {
        result += (alphabet.small.t as Row).u;
        doubleConsonant = false;
      }

      if (consonant in MaruMapping)
        result += alphabet[MaruMapping[consonant]][char] + "º";
      else if (consonant in TenTenMapping)
        result += alphabet[TenTenMapping[consonant]][char] + "\"";
      else
        result += alphabet[consonant][char];

      consonant = "_";
    } else if (char === "n" && consonant == "n") {
      result += alphabet.n.n;
    } else {
      if (consonant === char) {
        doubleConsonant = true;
        continue;
      }
      consonant = char;
    }
  }

  return result;
}
