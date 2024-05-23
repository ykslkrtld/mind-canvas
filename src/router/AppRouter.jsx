import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Profile from "../pages/Profile"
import PrivateRouter from "./PrivateRouter"
import Register from "../pages/Register"
import About from "../pages/About"
import Dashboard from "../pages/Dashboard"
import MyBlogs from "../pages/MyBlogs"
import NewBlog from "../pages/NewBlog"
import Detail from "../pages/Detail"
import Login from "../pages/Login"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="my-blogs" element={<MyBlogs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="detail/:id" element={<Detail />} />
          <Route path="new-blog" element={<NewBlog />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter
