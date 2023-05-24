import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NoteDetail from '../components/NoteDetail';

// API
import { deleteNote, getNote, archiveNote, unarchiveNote } from '../utils/network-data'

const DetailPage = () => {
    const [note, setNote] = React.useState(null)
    const { id } = useParams();
    const navigate = useNavigate()

    async function onDeleteNoteHandler(id) {
        await deleteNote(id)
        navigate('/')
    }

    React.useEffect(() => {
        async function fetchNotesFromApi() {
            const { error, data } = await getNote(id)
            if (!error) {
                setNote(data)
            }
        }
        fetchNotesFromApi()
        return () => {
            setNote(null)
        }
    }, [id])

    async function onToggleArchiveHandler(id) {
        note.archived ? await unarchiveNote(id) : await archiveNote(id)
        navigate('/')
    }

    if (note == null) {
        return (
            <p>Note detail is note Found</p>
        )
    }

    return (
        <>
            <NoteDetail {...note} onDelete={onDeleteNoteHandler} toggleArchive={onToggleArchiveHandler} />
        </>
    )
}


export default DetailPage