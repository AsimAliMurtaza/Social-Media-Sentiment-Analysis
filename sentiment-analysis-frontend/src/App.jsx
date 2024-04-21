import "./App.css";
import { Fragment } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Settings from "./routes/Settings";
import Reports from "./routes/Reports";
import Analytics from "./routes/Analytics";
import { NextUIProvider } from "@nextui-org/react";
import InputForm from "./routes/InputForm";

function App() {
  return (
    <Fragment>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/form" element={<InputForm />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Fragment>
  );
}

export default App;
