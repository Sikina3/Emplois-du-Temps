import { Routes, Route } from "react-router-dom";
import App from "../views/App";
import Modif from "../views/Modif";

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/modif" element={<Modif />} />
        </Routes>
    );
}

export default AppRoute;
