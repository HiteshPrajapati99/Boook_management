import { Outlet } from "react-router-dom";
import Heder from "./Heder";

export default function index() {
  return (
    <>
      <Heder />
      <Outlet />
    </>
  );
}
