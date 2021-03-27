import React from 'react'

export interface Props {
  tag: string
  dashed?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Tag: React.FC<Props> = ({ tag, dashed, onClick }) => {
  const dashedClassName = dashed === true ? 'border-dashed' : ''
  return <div
    className={`${dashedClassName} border border-gray-200 rounded-sm py-1 px-3 text-xs cursor-pointer select-none active:bg-gray-100`}
    onClick={onClick}
  >
    { tag }
  </div>
}

export default Tag
