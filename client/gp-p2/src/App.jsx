import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BattleArea } from "./pages/BattleArea";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/battle",
      element: <BattleArea />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
