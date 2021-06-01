export const asArray = <T>(val: T | T[]): T[] => (Array.isArray(val) ? val : [val])
