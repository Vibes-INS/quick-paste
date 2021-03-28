import React, { useRef, useState } from 'react'
import { Note } from '../interfaces/note.interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { copy } from '../utils'

interface Props {
  note: Note
  onUpdateContent?: (content: string) => void
  onDelete?: (id: string) => void
  folded?: boolean
}

const NoteCard: React.FC<Props> = ({ note, onUpdateContent, onDelete, folded }) => {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(note.content)
  const [copying, setCopying] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    return content.split('\n').length
  }

  const inlineIconClassName = 'ml-2 cursor-pointer transform text-xl scale-75 text-gray-400 active:text-gray-800 select-none translate-y-0.5'
  const editingClassName = editing
    ? 'border-yellow-500 ring-1 ring-yellow-500'
    : 'border-gray-200'
  const isEditing = editing && onUpdateContent
  const contentClassName = folded
    ? 'whitespace-nowrap overflow-ellipsis overflow-hidden block w-full relative pr-10'
    : 'whitespace-pre-wrap break-all'
  const copyIcon = folded
    ? 'absolute right-0 top-0'
    : ''
  return <div className={`${editingClassName} border rounded-md p-3 w-full relative pr-10 text-gray-700 dark:border-gray-700 dark:bg-black dark:text-gray-100 animation-show-up`}>
    {
      isEditing
        ? <textarea
            className="w-full resize-x-none appearance-none outline-none min-h-textarea bg-opacity-0 bg-white"
            value={content}
            onChange={event => setContent(event.target.value)}
            onKeyUp={onSaveByKeyUp}
            ref={textareaRef}
            onBlur={onSave}
            rows={getContentLineLength()}
          />
        : <span className={contentClassName}>
            { content || 'New Note' }
          <FontAwesomeIcon
            icon={copying ? faCheck : faCopy}
            className={`${inlineIconClassName} ${copyIcon}`}
            onClick={onCopy}
          />
          {
            onUpdateContent &&
            !folded &&
            <FontAwesomeIcon
                icon={faEdit}
                className={inlineIconClassName}
                onClick={onActiveEditing}
            />
          }
        </span>
    }

    {
      onDelete &&
        <FontAwesomeIcon
          icon={faTimes}
          className={`${inlineIconClassName} top-3 right-4 absolute`}
          onClick={() => onDelete(note.id)}
        />
    }
  </div>
}

export default NoteCard
