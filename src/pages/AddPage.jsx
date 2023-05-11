import React from 'react'
import { useNavigate } from "react-router-dom";
import NoteInput from '../components/NoteInput'

// data
import { addNote } from '../utils/local-data'

const AddPage = () => {
  const navigate = useNavigate();

  function onAddNoteHandler(contact) {
    addNote(contact);
    navigate("/");
  }

  return (
    <section>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  )
}

export default AddPage
