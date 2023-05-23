
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import NoteList from '../components/NoteList'
import SearchBar from '../components/SearchBar'

// API
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notes, setNote] = React.useState([])
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
      }
    }
    fetchNotesFromApi()

    return () => {
      setNote([])
    }
  }, [setNote])

  // console.log(notes)

  const notesFilter = notes.filter((note) => {
    return note.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
  });


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