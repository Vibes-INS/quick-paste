import React, { useRef, useState } from 'react'
import { Note } from '../interfaces/note.interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { copy } from '../utils'

interface Props {
  note: Note
  onUpdateContent?: (content: string) => void
  onDelete?: (id: string) => void
}

const NoteCard: React.FC<Props> = ({ note, onUpdateContent, onDelete }) => {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(note.content)
  const [copying, setCopying] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inlineIconClassName = 'ml-2 cursor-pointer text-sm text-gray-400 active:text-gray-800 select-none'

  function onSaveByKeyUp (event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const quit = event.code === 'Enter' && (event.altKey || event.ctrlKey)
    if (!quit) return
    onSave()
  }
  function onSave () {
    setContent(content)
    setEditing(false)
    if (onUpdateContent) {
      onUpdateContent(content)
    }
  }
  function onCopy () {
    setCopying(true)
    copy(content)
    setTimeout(() => setCopying(false), 1000)
  }
  async function onActiveEditing () {
    await setEditing(true)
    textareaRef?.current?.focus()
  }
  function getContentLineLength () {
    return Math.max(content.split('\n').length, 2)
  }

  const editingClassName = editing
    ? 'border-yellow-500 ring-1 ring-yellow-500'
    : 'border-gray-200'
  return <div className={`${editingClassName} border rounded-md p-3 w-full relative pr-10`}>
    {
      editing && onUpdateContent
        ? <div className="relative">
            <textarea
              className="w-full resize-x-none appearance-none outline-none text-gray-700"
              value={content}
              onChange={event => setContent(event.target.value)}
              onKeyUp={onSaveByKeyUp}
              ref={textareaRef}
              onBlur={onSave}
              rows={getContentLineLength()}
            />
            <FontAwesomeIcon icon={faSave} className={`${inlineIconClassName} bottom-4 right-4 absolute`} onClick={onSave}/>
          </div>
        : <span className="text-gray-700 break-all whitespace-pre-wrap">
            { content || 'New Note' }
            <FontAwesomeIcon icon={copying ? faCheck : faCopy} className={inlineIconClassName} onClick={onCopy}/>
            { onUpdateContent && <FontAwesomeIcon icon={faEdit} className={inlineIconClassName} onClick={onActiveEditing}/> }
        </span>
    }

    {
      onDelete && <FontAwesomeIcon
        icon={faTimes}
        className={`${inlineIconClassName} top-4 right-4 absolute`}
        onClick={() => onDelete(note.id)}
      />
    }
  </div>
}

export default NoteCard
