import { Provider } from "react-redux";
import "./App.css";
import { Header, Body, MainContainer, WatchPage } from "./components";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
