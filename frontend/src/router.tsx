import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/landingPage";
import SignupPage from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DashboardPage from "./Pages/dashboard";
import CreateTeamPage from "./Pages/createTeam";
import ProfilePage from "./Pages/profile";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Home page at the root path
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <DashboardPage />,
  },
  //   {
  //     path: "/recipe/:recipeId",
  //     element: <RecipeDetailPage />,
  //   },
  {
    path: "/createTeam",
    element: <CreateTeamPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default appRouter;
