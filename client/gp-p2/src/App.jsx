import{RouterProvider,createBrowserRouter} from "react-router-dom"
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path:"/login",
      element:""
    },
    {
      path:"/",
      element:""
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
