import * as React from 'react'
import { useNavigate } from "react-router-dom";
import NoteInput from '../components/NoteInput'

// data
import { addNote } from '../utils/network-data'

const AddPage = () => {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <section>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  )
}

export default AddPage
