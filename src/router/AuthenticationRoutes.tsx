import AuthenticationLayout from "../components/layout/AuthLayout/AuthenticationLayout";
import Login from "../components/auth/login";
import { Navigate } from "react-router-dom";
import Repeater from "../components/repeater/Repeater";
import UserForm from "../components/form/Form";

const AuthenticationRoutes = {
    path: '/',
    element: <AuthenticationLayout />,
    children: [
        {
            path: '',
            element: <Navigate to="login" replace={true} />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'repeater',
            element: <Repeater />
        },
        {
            path: 'userForm',
            element: <UserForm />
        },
    ]

}
export default AuthenticationRoutes;
