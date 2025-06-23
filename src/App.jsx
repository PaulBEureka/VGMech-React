import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LearnPage from './pages/LearnPage'



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path='/learn' element={<LearnPage/>}/>
      </Route>
    )
  )

  return <RouterProvider router={router}/>
}

export default App
