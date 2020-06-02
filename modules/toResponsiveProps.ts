export type ResponsiveProp<T> = T | T[]

const toResponsiveProps = <T extends {}>(arrayOrItem: T | T[]): T[] =>
  Array.isArray(arrayOrItem)
    ? arrayOrItem
    : arrayOrItem === undefined
    ? []
    : [arrayOrItem]

export default toResponsiveProps
