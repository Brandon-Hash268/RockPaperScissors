import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider> 
      <App />
    </LanguageProvider>
  </StrictMode>
);
