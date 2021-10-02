import React, { useMemo } from 'react'
import { Note } from '../interfaces/note.interface'
import NoteCard from './note-card'

export interface Props {
  notes: Note[]
  onUpdateContent?: (id: string, content: string) => void
  onUpdateSortValue?: (id: string) => void
  onDelete?: (id: string) => void
  filterKeyWord?: string
  folded?: boolean
}

const NoteGroup: React.FC<Props> = ({
  notes,
  onUpdateContent,
  onUpdateSortValue,
  onDelete,
  filterKeyWord,
  folded
}) => {
  function onUpdateContentById (id: string, content: string) {
    if (!onUpdateContent) return
    onUpdateContent(id, content)
  }

  const noteElements = useMemo(() => {
    return notes
      .filter(note => !filterKeyWord || note.content.match(filterKeyWord || ''))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(note => (
        <li key={note.id}>
          <NoteCard
            note={note}
            onUpdateContent={content => onUpdateContentById(note.id, content)}
            onUpdateSortValue={onUpdateSortValue}
            onDelete={onDelete}
            folded={folded}
          />
        </li>
      )
      )
      .reverse()
  }, [notes])

  return <ul className="grid grid-cols-1 gap-4 w-full">
    {noteElements}
  </ul>
}

export default NoteGroup
