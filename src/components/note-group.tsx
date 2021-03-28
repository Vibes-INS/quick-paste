import React from 'react'
import { Note } from '../interfaces/note.interface'
import NoteCard from './note-card'

export interface Props {
  notes: Note[]
  onUpdateContent?: (id: string, content: string) => void
  onDelete?: (id: string) => void
  filterKeyWord?: string
  folded?: boolean
}

const NoteGroup: React.FC<Props> = ({
  notes,
  onUpdateContent,
  onDelete,
  filterKeyWord,
  folded
}) => {
  function onUpdateContentById (id: string, content: string) {
    if (!onUpdateContent) return
    onUpdateContent(id, content)
  }

  return <ul className="grid grid-cols-1 gap-4 w-full">
    {
      notes
        .filter(note => !filterKeyWord || note.content.match(filterKeyWord || ''))
        .map(note => <li key={note.id}>
            <NoteCard
              note={note}
              onUpdateContent={content => onUpdateContentById(note.id, content)}
              onDelete={onDelete}
              folded={folded}
            />
          </li>
        )
        .reverse()
    }
  </ul>
}

export default NoteGroup
