import { useEffect, useState } from "react";
import store from "../../../redux/store";
import "./menu.css";
import { Button } from "@mui/material";
import { logOutUser } from "../../../redux/usersReducer";
import { useNavigate, useLocation } from "react-router-dom";

function Menu(): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().users.user[0]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="menu">
      <div className="menuTitle">main menu</div>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        {user && `Hello   ${user.firstName} ${user.lastName}!`}
      </div>
      <br />
      <br />
      <div className="buttons">
        {user?.userType === "admin" && (
          <>
            {location.pathname !== "/reports" ? (
              <Button
                style={{ textAlign: "center", margin: "auto" }}
                variant="contained"
                onClick={() => nav("/reports")}
              >
                reports
              </Button>
            ) : (
              <Button
                style={{ textAlign: "center" }}
                variant="contained"
                onClick={() => nav("/vacation")}
              >
                vacations
              </Button>
            )}
          </>
        )}
        {user ? (
          <div className="logout">
            <Button
              color="error"
              variant="contained"
              style={{ textAlign: "center" }}
              onClick={() => {
                store.dispatch(logOutUser());
                nav("/");
              }}
            >
              log out
            </Button>
          </div>
        ) : (
          <>
            <Button
              variant="contained"
              style={{ width: "106px", textAlign: "center" }}
              onClick={() => nav("/login")}
            >
              login
            </Button>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ width: "106px", textAlign: "center" }}
              onClick={() => nav("/register")}
            >
              register
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
