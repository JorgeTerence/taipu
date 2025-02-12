export function setupTranscriber(from: HTMLInputElement, to: HTMLInputElement) {
  from.addEventListener('input', () => {
    to.value = from.value
  })
}