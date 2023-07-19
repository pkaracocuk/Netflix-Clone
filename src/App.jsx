import './App.css'
import MainPage from './pages/MainPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MovieDetail from './pages/MovieDetail'
import Header from './components/Header'



function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/movie/:movie_id' element={<MovieDetail/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
