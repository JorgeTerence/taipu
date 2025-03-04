export type Row = Record<string, string>;
type Alphabet = Record<string, Record<string, string | Row>>;

export const hiragana: Alphabet = {
  _: { a: "あ", i: "い", u: "う", e: "え", o: "お" },
  k: { a: "か", i: "き", u: "く", e: "け", o: "こ" },
  s: { a: "さ", i: "し", u: "す", e: "せ", o: "そ" },
  t: { a: "た", i: "ち", u: "つ", e: "て", o: "と" },
  m: { a: "ま", i: "み", u: "む", e: "め", o: "も" },
  n: { a: "な", i: "に", u: "ぬ", e: "ね", o: "の", n: "ん" },
  h: { a: "は", i: "ひ", u: "ふ", e: "へ", o: "ほ" },
  r: { a: "ら", i: "り", u: "る", e: "れ", o: "ろ" },
  y: { a: "や", i: "", u: "ゆ", e: "", o: "よ" },
  w: { a: "わ", i: "", u: "", e: "", o: "を" },
  small: {
    _: { a: "ぁ", i: "ぃ", u: "ぅ", e: "ぇ", o: "ぉ" },
    y: { a: "ゃ", i: "", u: "ゅ", e: "", o: "ょ" },
    t: { u: "っ" },
  },
};

export const katakana: Alphabet = {
  _: { a: "ア", i: "イ", u: "ウ", e: "エ", o: "オ" },
  k: { a: "カ", i: "キ", u: "ク", e: "ケ", o: "コ" },
  s: { a: "サ", i: "シ", u: "ス", e: "セ", o: "ソ" },
  t: { a: "タ", i: "チ", u: "ツ", e: "テ", o: "ト" },
  m: { a: "マ", i: "ミ", u: "ム", e: "メ", o: "モ" },
  n: { a: "ナ", i: "ニ", u: "ヌ", e: "ネ", o: "ノ", n: "ン" },
  h: { a: "ハ", i: "ヒ", u: "フ", e: "ヘ", o: "ホ" },
  r: { a: "ラ", i: "リ", u: "ル", e: "レ", o: "ロ" },
  y: { a: "ヤ", i: "", u: "ユ", e: "", o: "ヨ" },
  w: { a: "ワ", i: "", u: "", e: "", o: "ヲ" },
  small: {
    _: { a: "ァ", i: "ィ", u: "ゥ", e: "ェ", o: "ォ" },
    y: { a: "ャ", i: "", u: "ュ", e: "", o: "ョ" },
    t: { u: "ッ" },
  },
};

const TenTenMapping: Record<string, string> = { g: "k", z: "s", d: "t", b: "h", v: "_", };
const MaruMapping: Record<string, string> = { p: "h" };

export function diacriticize(
  consonant: string,
  char: string,
  alphabet: Alphabet,
  small = false
) {
  if (consonant in MaruMapping)
    return alphabet[MaruMapping[consonant]][char] + "º";
  else if (consonant in TenTenMapping)
    return alphabet[TenTenMapping[consonant]][char] + '"';
  else if (small)
    return (alphabet.small[consonant] as Row)[char];
  else
    return alphabet[consonant][char];
}
