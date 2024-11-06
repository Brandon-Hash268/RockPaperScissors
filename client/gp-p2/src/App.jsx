import{RouterProvider,createBrowserRouter} from "react-router-dom"
// import './App.css'
import LoginPage from "./pages/LoginPage"

function App() {
  const router = createBrowserRouter([
    {
      path:"/login",
      element: <LoginPage/>
    },
    {
      path:"/",
      element:""
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
