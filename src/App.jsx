import './App.css';
import FootBar from './Components/FootBar/FootBar';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AdminPage from './Pages/AdminPage/AdminPage';
import HomePage from './Pages/HomePage/HomePage';
import ReportsPage from './Pages/ReportsPage/ReportsPage';
import ServicesPage from './Pages/ServicesPage/ServicesPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: `/services/:servicename`,
      element: <ServicesPage />,
    },
    {
      path: "/reports/:reportid",
      element: <ReportsPage report={'reportid'} />,
    },
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default App;