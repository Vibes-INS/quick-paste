import React from 'react'
import Tag from './tag'

export interface Props {
  tags: string[]
}

const TagGroup: React.FC<Props> = ({ tags }) => {
  return <div className="flex space-x-2 mt-3">
    {
      tags.map((tag, i) => <Tag key={i} tag={tag}/>)
    }

    <Tag tag="New Tag" dashed={true}/>
  </div>
}

export default TagGroup
