export function sanitizeFileName(name: string) {
  return name
    .trim() // remove leading/trailing spaces
    .replace(/\s+/g, "_") // replace spaces with underscores
    .replace(/[^a-zA-Z0-9_\-\.]/g, "") // remove special characters except underscore, dash, dot
    .toLowerCase(); // optional: normalize to lowercase
}
