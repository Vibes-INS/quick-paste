import React, { useEffect, useState } from 'react'
import * as localforage from 'localforage'
import Header from './components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ObjectID from 'bson-objectid'
import { Note } from './interfaces/note.interface'
import NoteGroup from './components/note-group'

const noteStore = localforage.createInstance({
  name: 'note'
})

function App () {
  const [notes, setNotes] = useState<Note[]>([])
  const [filterKeyWord, setFilterKeyWord] = useState('')
  const [folded, setFolded] = useState(false)
  async function readNoteStoreAll () {
    const readNotes: Note[] = []
    await noteStore.iterate<Note, void>(value => {
      readNotes.push(value)
    })
    return readNotes
  }

  async function onUpdateNoteContent (id: string, content: string) {
    const note = notes.find(n => n.id === id)
    if (!note) return
    note.content = content
    await noteStore.setItem<Note>(id, note)
    setNotes([...notes])
  }

  async function onUpdateNoteSortValue (id: string) {
    const note = notes.find(n => n.id === id)
    if (!note) return
    note.sortValue += 1
    await noteStore.setItem<Note>(id, note)
    setNotes([...notes])
  }

  async function onCreateNote (content: string = '', tags: string[] = []) {
    const id = new ObjectID().toHexString()
    const newNote: Note = {
      id,
      content,
      tags,
      sortValue: Math.min(...notes.map(note => note.sortValue)) - 1
    }
    await noteStore.setItem<Note>(id, newNote)
    await setNotes([...notes, newNote])
    window.scroll(0, document.body.scrollHeight)
  }

  async function onDelete (id: string) {
    await noteStore.removeItem(id)
    const index = notes.findIndex(note => note.id === id)
    notes.splice(index, 1)
    setNotes([...notes])
  }

  useEffect(() => {
    readNoteStoreAll().then(readNotes =>
      setNotes(readNotes.map(note => ({ ...note, sortValue: Number(note.sortValue) })))
    )
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-10 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 w-full m-auto max-w-primary">
      <Header onNewButton={() => onCreateNote()} folded={folded} setFolded={setFolded}/>

      <form className="relative select-none animation-show-down">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          className="bg-white dark:bg-black dark:text-gray-300 dark:border-gray-700 focus:border-yellow-500 focus:bg-opacity-5 focus:ring-1 focus:ring-yellow-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10 appearance-none"
          type="text"
          placeholder="Filter by keyword"
          value={filterKeyWord}
          onChange={event => setFilterKeyWord(event.target.value)}
        />
      </form>

      <NoteGroup
        notes={notes}
        onUpdateContent={onUpdateNoteContent}
        onUpdateSortValue={onUpdateNoteSortValue}
        onDelete={onDelete}
        filterKeyWord={filterKeyWord}
        folded={folded}
      />
    </div>
  )
}

export default App
