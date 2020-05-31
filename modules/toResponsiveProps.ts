export type ResponsiveProp<T> = T | T[]

const toResponsiveProps = <T extends {}>(array: T | T[]): T[] =>
  Array.isArray(array) ? array : [array]

export default toResponsiveProps
