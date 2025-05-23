// Utility to set a value at a given path (e.g., 'palette.primary.main') in an object
export function setByPath(
  obj: Record<string, any>,
  path: string,
  value: any
): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}
