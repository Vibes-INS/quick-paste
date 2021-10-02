import React from 'react'
import classNames from 'classnames'

export interface Props {
  tag: string
  dashed?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Tag: React.FC<Props> = ({
  tag,
  dashed = false,
  onClick
}) => {
  return <div
    className={classNames('border', 'border-gray-200', 'rounded-sm', 'py-1', 'px-3', 'text-xs', 'cursor-pointer', 'select-none', 'active:bg-gray-100', {
      'border-dashed': dashed
    })}
    onClick={onClick}
  >
    { tag }
  </div>
}

export default Tag
