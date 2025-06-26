import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LearnPage from './pages/LearnPage'
import SignInPage from './pages/SignInPage'



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path='/learn/:mechanicId' element={<LearnPage/>}/>
        <Route path='/sign-in' element={<SignInPage/>}/>
      </Route>
    )
  )

  return <RouterProvider router={router}/>
}

export default App
