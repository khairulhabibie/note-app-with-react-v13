import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddPage from './pages/AddPage';
import DetailPageWrapper from './pages/DetailPage';
import HomePage from './pages/HomePage';
import ArchivePageWrapper from './pages/ArchivePage';
import NotFound from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { getUserLogged, putAccessToken } from './utils/network-data';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null)
  const [initializing, setInitializing] = React.useState(true)

  async function onLoginSuccessHandler({ accessToken }) {
    putAccessToken(accessToken)
    const { data } = await getUserLogged()
    setAuthedUser(data)
  }

  async function onLogoutHandler() {
    setAuthedUser(null);
    putAccessToken('')
  }

  React.useEffect(() => {
    async function refreshPage() {
      const { data } = await getUserLogged()
      setAuthedUser(data)
      setInitializing(false)
    }
    refreshPage()
    return () => {
      setAuthedUser(null)
      setInitializing(true)
    }
  }, [])

  if (initializing === true) {
    return null
  }

  if (authedUser === null) {
    return (
      <div>
        <header>
          <h2>Aplikasi Catatan</h2>
          <Navigation authedUser={authedUser} />
        </header>
        <main>
          <Routes>
            <Route path="/*" exact element={<LoginPage loginSuccess={onLoginSuccessHandler} />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    )

  }

  return (
    <div>
      <header>
        <h2>Aplikasi Catatan - {authedUser.name}</h2>
        <Navigation authedUser={authedUser} logout={onLogoutHandler} />
      </header>
      <main>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/note/new" element={<AddPage />} />
          <Route path="/archives" element={<ArchivePageWrapper />} />
          <Route path="/note/:id" element={<DetailPageWrapper />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to="/404" replace />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
