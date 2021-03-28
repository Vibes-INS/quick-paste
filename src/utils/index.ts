export function copy (content: string): void {
  const input = document.createElement('textarea')
  input.value = content
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
