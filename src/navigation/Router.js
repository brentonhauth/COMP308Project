import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './NavBar';
import LoginPage from "../pages/LoginPage";
import SignupPage from '../pages/SignupPage';
import GroupListPage from '../pages/GroupListPage';

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/login" exact component={() => <LoginPage />} />
      <Route path="/signup" exact component={() => <SignupPage />} />
      <Route path="/groups" exact component={() => <GroupListPage />} />
    </BrowserRouter>
  );
}