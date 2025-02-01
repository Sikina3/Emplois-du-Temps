import { Outlet } from "react-router-dom";
import '../Styles/Admin.css'

const Admin = () => (
    <div className="app">
        <Outlet />
    </div>
);

export default Admin;