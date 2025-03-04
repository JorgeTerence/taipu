import "./style.css";
import {setupAlphabetPicker, setupTranscriber} from "./transcriber.ts";

var alphabet = {};
console.debug(alphabet); // just so that npm run build won't complain

setupAlphabetPicker(document.querySelector<HTMLInputElement>("#kana")!, document.querySelector<HTMLInputElement>("#from")!);
setupTranscriber(document.querySelector<HTMLInputElement>("#from")!, document.querySelector<HTMLParagraphElement>("#to")!);
