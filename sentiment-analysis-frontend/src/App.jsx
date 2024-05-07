import "./App.css";
import { Fragment } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductPage from "./routes/ProductPage";
import CategoryPage from "./routes/CategoryPage.jsx";
import Settings from "./routes/SettingsPage.jsx";
import { NextUIProvider } from "@nextui-org/react";
import ProductCategoryForm from "./routes/CategoryPage2.jsx";
import ViewPost from "./routes/ViewPost.jsx";
import PostsPage from "./routes/PostsPage.jsx";
import ProductSubPage from "./routes/ProductsSubPage.jsx";
import ViewUsers from "./routes/ViewUsers.jsx";
import AddUsers from "./routes/AddUsers.jsx";
import ManagePosts from "./routes/ManagePosts.jsx";
import ManageCategories from "./routes/ManageCategories.jsx";
import MainPage from "./routes/MainPage.jsx";
import Feed from "./routes/Feed.jsx";
function App() {
  return (
    <Fragment>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/viewproducts" element={<ProductPage />} />
            <Route path="/addproducts" element={<ProductSubPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/viewusers" element={<ViewUsers />} />
            <Route path="/addusers" element={<AddUsers />} />
            <Route path="/select-category" element={<ProductCategoryForm />} />
            <Route path="/createpost" element={<PostsPage />} />
            <Route path="/viewpost" element={<ViewPost />} />
            <Route path="/manageposts" element={<ManagePosts />} />
            <Route path="/managecategories" element={<ManageCategories />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/postsfeed" element={<Feed />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Fragment>
  );
}

export default App;
