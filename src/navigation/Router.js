import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './NavBar';
import LoginPage from "../pages/LoginPage";
import SignupPage from '../pages/SignupPage';
import GroupListPage from '../pages/group/GroupListPage';
import GroupDetailPage from "../pages/group/GroupDetailPage";
import PasswordResetPage from '../pages/PasswordResetPage';

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/login" exact component={() => <LoginPage />} />
      <Route path="/signup" exact component={() => <SignupPage />} />
      <Route path="/groups" exact component={() => <GroupListPage />} />
      <Route path="/groups/:id" exact component={() => <GroupDetailPage />} />
      <Route path="/passreset" exact component={() => <PasswordResetPage />} />
    </BrowserRouter>
  );
}