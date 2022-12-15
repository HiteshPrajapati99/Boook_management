import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Login And Register
import { Register, Login } from "./components/auth";

// Profile

import { Edit_Profile, User_Profile } from "./components/Pages/Home";

// Books

import { Books, Create_book, Edit_book } from "./components/Pages/Books";

// Users

import { Users, Create_User, Edit_User } from "./components/Pages/users";

// Globle Routes
import Protect from "./DashBord";
import Page404 from "./pages/Page404";
import { Globlestyle } from "./Globlestyle";

function App() {
  return (
    <BrowserRouter>
      <Globlestyle />
      <Routes>
        {/* Login And Register Route */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Protectted Routes */}
        <Route path="/" element={<Protect />}>
          <Route index element={<User_Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="books" element={<Books />} />
          <Route path="create_books" element={<Create_book />} />
          <Route path="add_user" element={<Create_User />} />
          <Route path="profile/update/:_id" element={<Edit_Profile />} />
          <Route path="books_edit/:_id" element={<Edit_book />} />
          <Route path="user_edit/:_id" element={<Edit_User />} />
        </Route>

        {/* Error Page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
