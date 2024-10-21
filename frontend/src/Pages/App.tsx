import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "../router";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return <RouterProvider router={router} />;
};

export default App;
