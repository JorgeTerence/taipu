import {Alphabet, hiragana, katakana} from "./alphabets.ts";

const TenTenMapping: Record<string, string> = {g: "k", z: "s", d: "t", b: "h"};
const MaruMapping: Record<string, string> = {"p": "h"};

function isVowel(char: string) {
  return ["a", "i", "u", "e", "o"].includes(char);
}

let alphabet = hiragana;

export function setupAlphabetPicker(toggle: HTMLInputElement) {
  if (toggle.checked) alphabet = katakana;
  else alphabet = hiragana;
}

export function setupTranscriber(from: HTMLInputElement, to: HTMLParagraphElement, kana: Alphabet) {
  let consonant = "_";
  let doubleConsonant = false;
  from.addEventListener("input", () => {
    if (kana == Alphabet.KATAKANA)
      alphabet = katakana;
    else if (kana == Alphabet.HIRAGANA)
      alphabet = hiragana;

    /*
    * $YA -> $I + ya
    * $OU -> $OU
    * YOU -> yo + U
    * F? -> FU + ?
    * V? -> U" + ?
    * J? -> SHI" + ?
    * DZU -> DU -> TSU"
    * */
    consonant = "_";
    to.innerText = "";
    doubleConsonant = false;
    console.clear();

    // create intermediate variable for from.value and replace tsu -> tu
    const fromValue = from.value.replace("tsu", "tu").replace("shi", "si");

    for (const char of fromValue) {
      if (isVowel(char)) {
        if (doubleConsonant) {
          to.innerText += "っ"; // TODO: switch between hira and kata
          doubleConsonant = false;
        }

        if (consonant in MaruMapping)
          to.innerText += alphabet[MaruMapping[consonant]][char] + "º";
        else if (consonant in TenTenMapping)
          to.innerText += alphabet[TenTenMapping[consonant]][char] + "\"";
        else
          to.innerText += alphabet[consonant][char];

        consonant = "_";
      } else if (char === "n" && consonant == "n") {
        to.innerText += alphabet["n"]["n"];
      } else {
        if (consonant === char) {
          doubleConsonant = true;
          continue;
        }
        consonant = char;
      }
    }
  });
}