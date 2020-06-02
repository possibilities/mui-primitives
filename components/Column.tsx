import React, { ReactNode } from 'react'

export interface ColumnProps {
  children: ReactNode
  width?:
    | 'content'
    | '1/2'
    | '1/3'
    | '2/3'
    | '1/4'
    | '3/4'
    | '1/5'
    | '2/5'
    | '3/5'
    | '4/5'
}

const Column = ({
  children,
  width: _widthIsUsedByParentColumnsOnly,
}: ColumnProps) => <div>{children}</div>

export default Column
