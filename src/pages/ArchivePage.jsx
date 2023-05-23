import React from 'react'
import NoteList from '../components/NoteList'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

// API
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data'

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notes, setNote] = React.useState([])
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '')

  async function onDeleteNoteHandler(id) {
    await deleteNote(id);
    const { error, data } = await getArchivedNotes()
    if (!error) {
      setNote(data)
    }
  }

  async function onToggleArchiveNoteHandler(id) {
    await unarchiveNote(id)
    const { error, data } = await getArchivedNotes()
    if (!error) {
      setNote(data)
    }
  }

  async function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword })
  }

  React.useEffect(() => {
    async function fetchNotesFromApi() {
      const { error, data } = await getArchivedNotes()
      if (!error) {
        setNote(data)
      }
    }
    fetchNotesFromApi()
    return () => {
      setNote([])
    }
  }, [setNote])

  const notesFilter = notes.filter((note) => {
    return note.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
  });

  return (
    <>
      <section>
        <h3>Cari Catatan Arsip</h3>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <br />
        {notesFilter.length !== 0 ? <NoteList notes={notesFilter} onDelete={onDeleteNoteHandler} onToggleArchive={onToggleArchiveNoteHandler} /> : <p>Tidak ada catatan Arsip !</p>}
      </section>
    </>
  )
}

export default ArchivePage


