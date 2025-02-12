import './style.css'
import {setupTranscriber} from "./transcriber.ts";

setupTranscriber(document.querySelector<HTMLInputElement>('#from')!, document.querySelector<HTMLParagraphElement>('#to')!);
