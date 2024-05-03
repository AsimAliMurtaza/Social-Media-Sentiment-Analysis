import "./App.css";
import { Fragment } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductPage from "./routes/ProductPage";
import CategoryPage from "./routes/CategoryPage.jsx";
import Settings from "./routes/SettingsPage.jsx";
import { NextUIProvider } from "@nextui-org/react";
import UsersPage from "./routes/UsersPage.jsx";
import ProductCategoryForm from "./routes/CategoryPage2.jsx";
import ViewPost from "./routes/ViewPost.jsx";
import PostsPage from "./routes/PostsPage.jsx";
import ProductSubPage from "./routes/ProductsSubPage.jsx";
import ViewUsers from "./routes/ViewUsers.jsx";
import AddUsers from "./routes/AddUsers.jsx";
import ManagePosts from "./routes/ManagePosts.jsx"
import ManageCategories from "./routes/ManageCategories.jsx"


function App() {
  return (
    <Fragment>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/viewproducts" element={<ProductPage />} />
            <Route path="/addproducts" element={<ProductSubPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/viewusers" element={<ViewUsers />} />
            <Route path="/addusers" element={<AddUsers />} />
            <Route path="/select-category" element={<ProductCategoryForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/posts" element={<ViewPost />} />
            <Route path="/createpost" element={<PostsPage />} />
            <Route path="/viewpost" element={<ViewPost />} />
            <Route path="/manageposts" element={<ManagePosts />} />
            <Route path="/managecategories" element={<ManageCategories />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Fragment>
  );
}

export default App;
