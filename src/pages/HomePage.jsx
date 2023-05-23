
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import NoteList from '../components/NoteList'
import SearchBar from '../components/SearchBar'

// data
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notes, setNote] = React.useState(() => getActiveNotes())
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '')

  const onDeleteNoteHandler = (id) => {
    deleteNote(id);
    const activeNotes = getActiveNotes()
    setNote(activeNotes)
  }

  const onToggleArchiveNoteHandler = (id) => {
    archiveNote(id)
    const activeNotes = getActiveNotes()
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
      <h3>Cari Catatan Aktif</h3>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <br />
      {notesFilter.length !== 0 ? <NoteList notes={notesFilter} onDelete={onDeleteNoteHandler} onToggleArchive={onToggleArchiveNoteHandler} /> : <p>Tidak ada catatan aktif !</p>}
    </>
  )
}


export default HomePage;