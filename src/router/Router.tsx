import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Tavern from "../pages/Tavern";
import ExtCastle from "../pages/ExtCastle";
import Castle from "../pages/Castle";
import Donjon from "../pages/Donjon";
import Bedroom from "../pages/Bedroom";
import Labo from "../pages/Labo";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/tavern',
        element: <ProtectedRoute component={Tavern} />,
    },
    {
        path: '/ext-castle',
        element: <ProtectedRoute component={ExtCastle} />,
    },
    {
        path: '/castle',
        element: <ProtectedRoute component={Castle} />,
    },
    {
        path: '/castle-donjon',
        element: <ProtectedRoute component={Donjon} />,
    },
    {
        path: '/castle-bedroom',
        element: <ProtectedRoute component={Bedroom} />,
    },
    {
        path: '/castle-labo',
        element: <ProtectedRoute component={Labo} />,
    },
    {
        path: '*',
        element: <ProtectedRoute component={App} />,
    }
])

const Router = () => (
    <RouterProvider router={router} />
)

export default Router
