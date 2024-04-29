import "./App.css";
import { Fragment } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Settings from "./routes/Settings";
import Reports from "./routes/Reports";
import Analytics from "./routes/Analytics";
import { NextUIProvider } from "@nextui-org/react";
import FacebookInputForm from "./routes/FacebookPage.jsx";
import InstaInputForm from "./routes/InstagramPage.jsx";
import ProductCategoryForm from "./routes/CategoryPage.jsx";


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
            <Route path="/fb-form" element={<FacebookInputForm />} />
            <Route path="/insta-form" element={<InstaInputForm />} />
            <Route path="/select-category" element={<ProductCategoryForm />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Fragment>
  );
}

export default App;
