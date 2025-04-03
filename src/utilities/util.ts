export const sanitizeHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const anchors = doc.querySelectorAll('a')
  anchors.forEach((anchor) => {
    anchor.setAttribute('target', '_blank')
    anchor.setAttribute('rel', 'noopener noreferrer')
  })
  return doc.body.innerHTML
}
