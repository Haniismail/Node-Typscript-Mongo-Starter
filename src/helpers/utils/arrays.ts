export function hasCommonElement<T>(list1: T[], list2: T[]): boolean {
  return list1.some((element) => list2.includes(element));
}
