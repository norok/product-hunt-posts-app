export default function mergeUnique<T>(arr1: T[], arr2: T[], key: keyof T): T[] {
  const merged = [...arr1, ...arr2];
  const seen: any = {};

  return merged.filter(item => {
    const value = item[key];
    if (seen[value]) {
      return false;
    }
    seen[value] = true;
    return true;
  });
}
