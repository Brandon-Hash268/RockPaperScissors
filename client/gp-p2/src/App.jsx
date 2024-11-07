import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BattleArea } from "./pages/BattleArea";

function App() {
  const router = createBrowserRouter([
    {
      loader: () => {
        if(localStorage.getItem("id")){
          throw redirect("/")
        }
        return null
      }, 
      path: "/login",
      element: <LoginPage />,
    },
    {
      loader: () => {
        if(!localStorage.getItem("id")){
          throw redirect('/login')
        }
        return null
      },
      children : [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/battle",
          element: <BattleArea />,
        },
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
