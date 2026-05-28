import './App.css';
import * as Report from '../src/Scheme/Report';
import FootBar from './Components/FootBar/FootBar';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AdminPage from './Pages/AdminPage/AdminPage';
import HomePage from './Pages/HomePage/HomePage';
import ReportsPage from './Pages/ReportsPage/ReportsPage';
import ServicesPage from './Pages/ServicesPage/ServicesPage';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage';
import AllReportsPage from './Pages/AllReportsPage/AllReportsPage';
import ContactUsPage from './Pages/ContactUsPage/ContactUsPage';
import DisclaimerPage from './Pages/DisclaimerPage/DisclaimerPage';
import HowToOrderPage from './Pages/HowToOrderPage/HowToOrderPage';
import TermnConditionPage from './Pages/TermsnConditionsPage/TermsnConditionPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage/PrivacyPolicyPage';
import Blogs from './Pages/Blogs/Blogs';
import PressRelease from './Pages/PressRelease/PressRelease';
import SingleBlogPage from './Pages/Blogs/SingleBlogPage/SingleBlogPage'; 
import SinglePRPage from './Pages/PressRelease/SinglePressReleasePage/SinglePressReleasePage';

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
      path: `/reports/`,
      element: <AllReportsPage />,
    },
    {
      path: "/reports/:reportid",
      element: <ReportsPage report={'reportid'} />,
    },
    {
      path: "/aboutUs",
      element: <AboutUsPage />,
    },
    {
      path: "/contactus",
      element: <ContactUsPage />,
    },
    {
      path: "/disclaimer",
      element: <DisclaimerPage />,
    },
    {
      path: "/howtoorder",
      element: <HowToOrderPage />,
    },
    {
      path: "/termsCondition",
      element: <TermnConditionPage />
    },
    {
      path: "/privacypolicy",
      element: <PrivacyPolicyPage />
    },
    {
      path: "/admin",
      element: <AdminPage />
    },
    {
      path: "/blogs",
      element: <Blogs />
    },
    {
      path: "/pressrelease",
      element: <PressRelease />
    },
    {
      path: "/blogs/:blogtitle",
      element: <SingleBlogPage />
    },
    {
      path: "/pressrelease/:prtitle",
      element: <SinglePRPage />
    }
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default App;