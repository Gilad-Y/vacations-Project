import { FormLabel, Button, Typography, Link, Alert } from "@mui/material";
import "./logInPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import { userModel } from "../../../Models/userModel";
import { useForm } from "react-hook-form";
import axios from "axios";
import store from "../../../redux/store";
import { logInUser } from "../../../redux/usersReducer";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function LogInPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const nav = useNavigate();
  const { register, handleSubmit } = useForm<userModel>();
  const logIn = async (data: userModel) => {
    // console.log(data)
    axios
      .post("http://localhost:4000/api/v1/user/logIn", data)
      .then((response) => {
        // console.log(response)
        store.dispatch(logInUser(response.data));
      })
      .then(() => {
        nav("/vacation");
      })
      .catch((err) => {
        console.log(err);
        setShowAlert(true);
      });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="logInPage">
      <div>
        {showAlert && (
          <Alert severity="error" onClose={handleCloseAlert}>
            Email or password is incorrect
          </Alert>
        )}
      </div>
      <Typography variant="h4" color="primary">
        Login
      </Typography>
      <br />
      <form
        onSubmit={
          // (event) => {
          //     event.preventDefault();
          handleSubmit(logIn)
        }
      >
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>email</FormLabel>
          <Input type="email" {...register("userEmail")} required />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>password</FormLabel>
          <Input
            sx={{ width: "200px" }}
            type={showPassword ? "text" : "password"}
            required
            {...register("userPassword")}
            endDecorator={
              <Button
                style={{ marginRight: "-25px" }}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                color="inherit"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            }
          />
        </FormControl>
        <br />
        <Button color="primary" type="submit" variant="contained">
          Login
        </Button>
      </form>
      <br />
      <span style={{ color: "gray" }}>don't have an account?</span>
      <br />
      <Link
        underline="none"
        onClick={() => {
          nav("/register");
        }}
      >
        register now
      </Link>
    </div>
  );
}

export default LogInPage;
// event.preventDefault();
