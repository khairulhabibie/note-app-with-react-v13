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
import ThemeContext from './contexts/ThemeContext';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null)
  const [initializing, setInitializing] = React.useState(true)
  const [theme, setTheme] = React.useState('light')

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


  function toggleTheme() {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light'
    })
  }

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme
    };
  }, [theme]);

  React.useEffect(() => {
    function changeTheme(dataTheme) {
      document.documentElement.setAttribute('data-theme', dataTheme);
      localStorage.setItem('localTheme', theme)
    }
    const localTheme = localStorage.getItem('localTheme')
    localTheme === null ? changeTheme(localTheme) : changeTheme(theme)

    return () => {
      changeTheme()
    }
  }, [theme])

  if (initializing === true) {
    return null
  }

  if (authedUser === null) {
    return (
      <>
        <ThemeContext.Provider value={themeContextValue}>
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
        </ThemeContext.Provider>
      </>
    )
  }

  return (
    <>
      <ThemeContext.Provider value={themeContextValue}>
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
      </ThemeContext.Provider>
    </>
  );
}

export default App;
