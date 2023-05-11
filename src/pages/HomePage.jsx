import React, { Component } from 'react'
import { useSearchParams } from 'react-router-dom'
import NoteList from '../components/NoteList'
import SearchBar from '../components/SearchBar'
import PropTypes from 'prop-types'

// data
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data'

const HomePageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  )
}

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: getActiveNotes(),
      keyword: props.defaultKeyword || ""
    }
  }

  onDeleteNoteHandler = (id) => {
    deleteNote(id);
    this.setState(() => {
      return {
        notes: getActiveNotes()
      };
    });
  }

  onToggleArchiveNoteHandler = (id) => {
    archiveNote(id)
    this.setState(() => {
      return {
        notes: getActiveNotes()
      }
    })
  }

  onKeywordChangeHandler = (keyword) => {
    this.setState(() => {
      return {
        keyword
      }
    })
    this.props.keywordChange(keyword)
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });



    return (
      <section>
        <h3>Cari Catatan Aktif</h3>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <br />
        {notes.length !== 0 ? <NoteList notes={notes} onDelete={this.onDeleteNoteHandler} onToggleArchive={this.onToggleArchiveNoteHandler} /> : <p>Tidak ada catatan aktif !</p>}

      </section>
    )
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
}

export default HomePageWrapper