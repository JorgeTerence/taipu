import {diacriticize, hiragana, katakana, Row} from "./alphabets.ts";

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
    * YOU -> yo + U
    * F? -> FU + ?
    * V? -> U" + ?
    * */
  });
}

// TEST: happyaku v
// TEST: kanojo v

function transcribeRomaji(romaji: string) {
  let result = "";
  let consonant = "_";
  let doubleConsonant = false;
  let small = false;

  romaji = romaji
    .replaceAll("tsu", "tu")
    .replaceAll("shi", "si")
    .replaceAll("chi", "ti")
    .replaceAll("ji", "zi")
    .replaceAll(/j(?=[aiueo])/g, "zy")
    .replaceAll("dzu", "du")
    .replaceAll("fu", "hu");

  function write(vowel: string) {
    if (doubleConsonant) {
      result += (alphabet.small.t as Row).u;
      doubleConsonant = false;
    }

    result += diacriticize(consonant, vowel, alphabet, small);

    consonant = "_";
    small = false;
  }

  for (const char of romaji) {
    if (isVowel(char)) {
      write(char);
    } else if (char === "n" && consonant == "n")
      result += alphabet.n.n;
    else if (consonant === char)
      doubleConsonant = true;
    else {
      if (consonant !== "_" && char == "y") {
        write("i");
        small = true;
      }

      consonant = char;
    }
  }

  return result;
}
