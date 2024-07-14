import { Route, Routes } from "react-router-dom";
import "./mainRoute.css";
import LogInPage from "../../Pages/logInPage/logInPage";
import Page404 from "../../Pages/page404/page404";
import VacationsPage from "../../Pages/vacationsPage/vacationsPage";
import RegisterPage from "../../Pages/registerPage/registerPage";
import AddVacationPage from "../../Pages/addVacationPage/addVacationPage";
import UpdateVacationPage from "../../Pages/updateVacationPage/updateVacationPage";
import VacationsReport from "../../Pages/VacationsReport/VacationsReport";
import Home from "../../layouts/home/home";
function MainRoute(): JSX.Element {
  return (
    <div className="mainRoute">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vacation" element={<VacationsPage />} />
        <Route path="/addVacation" element={<AddVacationPage />} />
        <Route path="/updateVacation/:id" element={<UpdateVacationPage />} />
        <Route path="/reports" element={<VacationsReport />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
