import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './NavBar';


export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
}