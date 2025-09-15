const DEFAULT_NAME = "new_resume_file";

export function sanitizeFileName(name: string) {
  return (
    name
      .trim()
      .replace(/\s+/g, "_") // replace spaces with underscores
      .replace(/[^a-zA-Z0-9_\-\.]/g, "") // remove special characters except underscore, dash, dot
      .toLowerCase() || DEFAULT_NAME
  );
}
