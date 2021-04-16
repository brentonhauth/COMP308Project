import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './NavBar';
import LoginPage from "../pages/LoginPage";
import SignupPage from '../pages/SignupPage';
import GroupListPage from '../pages/group/GroupListPage';
import GroupDetailPage from "../pages/group/GroupDetailPage";
import PasswordResetPage from '../pages/PasswordResetPage';
import ChallengeListPage from '../pages/challenge/ChallengeListPage';
import ChallengeDetailPage from '../pages/challenge/ChallengeDetailPage';
import ProfilePage from "../pages/ProfilePage";
import SearchUserPage from "../pages/admin/SearchUserPage";
import UpdateUserPage from "../pages/admin/UpdateUserPage";

import RepChallengeListPage from "../pages/rep/RepChallengeListPage";
import RepEditChallengePage from "../pages/rep/RepEditChallengePage";
import RepRewardListPage from "../pages/rep/RepRewardListPage";
import RepEditRewardPage from "../pages/rep/RepEditRewardPage";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/login" exact component={() => <LoginPage />} />
      <Route path="/profile" exact component={() => <ProfilePage />} />
      <Route path="/signup" exact component={() => <SignupPage />} />
      <Route path="/groups" exact component={() => <GroupListPage />} />
      <Route path="/groups/:id" exact component={() => <GroupDetailPage />} />
      <Route path="/challenges" exact component={() => <ChallengeListPage />} />
      <Route path="/challenges/:id" exact component={() => <ChallengeDetailPage />} />
      <Route path="/passreset" exact component={() => <PasswordResetPage />} />
      <Route path="/searchUser" exact component={() => <SearchUserPage />} />
      <Route path="/admin/user/:id" exact component={() => <UpdateUserPage />} />
      <Route path="/rep/challenges" exact component={() => <RepChallengeListPage />} />
      <Route path="/rep/challenges/:id" exact component={() => <RepEditChallengePage />} />
      <Route path="/rep/rewards" exact component={() => <RepRewardListPage />} />
      <Route path="/rep/rewards/:id" exact component={() => <RepEditRewardPage />} />
    </BrowserRouter>
  );
}