export function toBytes(data: string): Uint8Array {
  return Uint8Array.from({ length: data.length }, (_, i) => data.charCodeAt(i))
}

export function toHex(data: ArrayBuffer): string {
  return Array.from(new Uint8Array(data))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
