const ensureArray = <T extends {}>(array: T | T[]): T[] =>
  Array.isArray(array) ? array : [array]

export default ensureArray
