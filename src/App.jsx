import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import NotFound from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { getUserLogged, putAccessToken } from './utils/network-data';
// import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null)
  const [initializing, setInitializing] = React.useState(true)
  // const [themeContext, setThemeContext] = React.useState('Light')

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
            <Route path="/login" exact element={<LoginPage loginSuccess={onLoginSuccessHandler} />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/*' element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <>
      {/* <ThemeProvider value={themeContext}> */}
      <header>
        <h2>Aplikasi Catatan - {authedUser.name}</h2>
        <Navigation authedUser={authedUser} logout={onLogoutHandler} />
      </header>
      <main>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path='/*' element={<Navigate to="/" replace />} />
          <Route path="/note/new" element={<AddPage />} />
          <Route path="/archives" element={<ArchivePage />} />
          <Route path="/note/:id" element={<DetailPage />} />
          <Route path='/404' element={<NotFound />} />
        </Routes>

      </main>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
