import React from 'react'
import NoteList from '../components/NoteList'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

// data
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data'

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notes, setNote] = React.useState(() => getArchivedNotes())
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '')

  const onDeleteNoteHandler = (id) => {
    deleteNote(id);
    const activeNotes = getArchivedNotes()
    setNote(activeNotes)
  }

  const onToggleArchiveNoteHandler = (id) => {
    unarchiveNote(id)
    const activeNotes = getArchivedNotes()
    setNote(activeNotes)
  }

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword })
  }

  const notesFilter = notes.filter((note) => {
    return note.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
  });

  return (
    <>
      <h3>Cari Catatan Arsip</h3>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <br />
      {notesFilter.length !== 0 ? <NoteList notes={notesFilter} onDelete={onDeleteNoteHandler} onToggleArchive={onToggleArchiveNoteHandler} /> : <p>Tidak ada catatan Arsip !</p>}
    </>
  )
}

export default ArchivePage


