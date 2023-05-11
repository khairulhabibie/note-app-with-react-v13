import * as React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import ArchiveButton from './ArchiveButton'
import { showFormattedDate } from '../utils'

const NoteItem = ({ title, body, createdAt, id, archived, onDelete, onToggleArchive }) => {
  return (
    <div className='note-item'>
      <div >
        <h4>
          <Link to={`/note/${id}`}>{title}</Link>
        </h4>
        <p className='note-item-date'>{showFormattedDate(createdAt)}</p>
      </div>
      <div className='note-item-body'><p>{body}</p></div>
      <div className='note-item-button'>
        <DeleteButton id={id} onDelete={onDelete} />
        <ArchiveButton id={id} archived={archived} onToggleArchive={onToggleArchive} />
      </div>
    </div>
  )
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
}

export default NoteItem
