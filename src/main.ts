import "./style.css";
import {setupAlphabetPicker, setupTranscriber} from "./transcriber.ts";

let alphabet = {};
console.log(alphabet)

setupAlphabetPicker(document.querySelector<HTMLInputElement>("#kana")!, document.querySelector<HTMLInputElement>("#from")!);
setupTranscriber(document.querySelector<HTMLInputElement>("#from")!, document.querySelector<HTMLParagraphElement>("#to")!);
