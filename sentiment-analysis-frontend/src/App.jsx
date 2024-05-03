import "./App.css";
import { Fragment } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductPage from "./routes/ProductPage";
import PostsPage from "./routes/PostsPage";
import CategoryPage from "./routes/CategoryPage.jsx";
import Settings from "./routes/SettingsPage.jsx";
import { NextUIProvider } from "@nextui-org/react";
import UsersPage from "./routes/UsersPage.jsx";
import ProductCategoryForm from "./routes/CategoryPage2.jsx";
import Createpost from './routes/PostsPage.jsx'


function App() {
  return (
    <Fragment>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/category" element={<CategoryPage />} />
          
            <Route path="/users" element={<UsersPage />} />
            <Route path="/select-category" element={<ProductCategoryForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/posts" element={<Createpost />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Fragment>
  );
}

export default App;
