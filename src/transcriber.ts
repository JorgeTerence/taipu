import {Alphabet, hiragana, katakana} from "./alphabets.ts";

const TenTenMapping: Record<string, string> = {g: "k", z: "s", d: "t", b: "h"};
const MaruMapping: Record<string, string> = {"p": "h"};

function isVowel(char: string) {
  return ["a", "i", "u", "e", "o"].includes(char);
}

let alphabet = hiragana;
console.log(alphabet)

export function setupAlphabetPicker(toggle: HTMLInputElement) {
  if (toggle.checked) alphabet = katakana;
  else alphabet = hiragana;
}

export function setupTranscriber(from: HTMLInputElement, to: HTMLParagraphElement, kana: Alphabet) {
  let consonant = "_";
  let diacritic = "";
  from.addEventListener("input", () => {
    if (kana == Alphabet.KATAKANA)
      alphabet = katakana;
    else if (kana == Alphabet.HIRAGANA)
      alphabet = hiragana;

    /*
    * $YA -> $I + ya
    * $$? -> tsu + $$?
    * $OU -> $OU
    * YOU -> yo + U
    * F? -> FU + ?
    * V? -> U" + ?
    * J? -> SHI" + ?
    * SHI -> SHI
    * */
    consonant = "_";
    diacritic = "";
    to.innerText = "";

    for (const char of from.value) {
      if (isVowel(char)) {
        to.innerText += hiragana[consonant][char] + diacritic;
        consonant = "_";
        diacritic = "";
      } else if (char === "n" && consonant == "n") {
        to.innerText += hiragana["n"]["n"];
      } else {
        if (char in TenTenMapping) {
          consonant = TenTenMapping[char];
          diacritic = "\"";
        } else if (char in MaruMapping) {
          consonant = MaruMapping[char];
          diacritic = "º";
        } else
          consonant = char;
      }
    }
  });
}