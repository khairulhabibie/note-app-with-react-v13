
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import NoteList from '../components/NoteList'
import SearchBar from '../components/SearchBar'

// API
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data'

function HomePage() {
  const [notes, setNote] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '')

  async function onDeleteNoteHandler(id) {
    await deleteNote(id);
    const { error, data } = await getActiveNotes()
    if (!error) {
      setNote(data)
    }
  }

  async function onToggleArchiveNoteHandler(id) {
    await archiveNote(id)
    const { error, data } = await getActiveNotes()
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
      const { error, data } = await getActiveNotes()
      if (!error) {
        setNote(data)
        setLoading(false)
      }
    }
    fetchNotesFromApi()

    return () => {
      setLoading(true)
    }
  }, [])


  const notesFilter = notes.filter((note) => {
    return note.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
  });

  if (loading) {
    return (
      <section><h3>Loading...!</h3></section>
    )
  }

  return (
    <>
      <section> <h3>Cari Catatan Aktif</h3>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <br />
        {notesFilter.length !== 0 ? <NoteList notes={notesFilter} onDelete={onDeleteNoteHandler} onToggleArchive={onToggleArchiveNoteHandler} /> : <p>Tidak ada catatan aktif !</p>}</section>
    </>
  )
}


export default HomePage;