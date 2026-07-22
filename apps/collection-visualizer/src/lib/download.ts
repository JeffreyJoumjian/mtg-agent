/** Fetch an image and save it to the user's downloads. Scryfall serves images with permissive CORS,
 *  so the blob round-trip works and forces a real download — the `download` attribute on an <a> is
 *  ignored for cross-origin URLs, which would otherwise just open the image. */
export async function downloadImage(url: string, filename: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)

  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
}

/** A filesystem-safe `.png` file name from a card/face name (e.g. "Bruce Banner // The Hulk"). */
export function imageFilename(name: string): string {
  const clean = name.replace(/[\/\\:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim()
  return `${clean || 'card'}.png`
}
