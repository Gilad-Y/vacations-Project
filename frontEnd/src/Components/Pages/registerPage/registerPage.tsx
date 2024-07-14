import {
  Typography,
  Button,
  Link,
  FormControl,
  FormLabel,
  Alert,
} from "@mui/material";
import "./registerPage.css";
import { useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import { useForm } from "react-hook-form";
import { userModel } from "../../../Models/userModel";
import axios from "axios";
import store from "../../../redux/store";
import { logInUser } from "../../../redux/usersReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ColorPaletteProp } from "@mui/joy";
import { useState } from "react";

function RegisterPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate();
  const [color, setColor] = useState<ColorPaletteProp>("neutral");
  const { register, handleSubmit } = useForm<userModel>();
  const registerUser = async (data: userModel) => {
    if (color == "neutral" && data.userPassword.length >= 4) {
      data.userType = "regular";
      console.log(data);
      axios
        .post("http://localhost:4000/api/v1/user/addUser", data)
        .then((response) => {
          console.log(response.data, "logged in");
          store.dispatch(logInUser(response.data));
        })
        .then(() => {
          nav("/vacation");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowAlert(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const checkEmail = async (event: any) => {
    const emailToCheck = event.target.value;
    axios
      .get("http://localhost:4000/api/v1/user/checkEmail", {
        params: { emailToCheck },
      })
      .then((res) => {
        if (res.data) {
          setColor("neutral");
        } else {
          setColor("danger");
        }
      });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="registerPage">
      {showAlert && (
        <Alert severity="error" onClose={handleCloseAlert}>
          one or more of the information is incorrect
        </Alert>
      )}
      <Typography variant="h4" color="primary">
        register
      </Typography>
      <br />
      <form
        onSubmit={
          // (event) => {
          //     event.preventDefault();
          handleSubmit(registerUser)
        }
      >
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>first name</FormLabel>
          <Input {...register("firstName")} type="text" />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>last name</FormLabel>
          <Input {...register("lastName")} type="text" />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>email</FormLabel>
          <Input
            {...register("userEmail")}
            type="email"
            color={color}
            onBlur={checkEmail}
          />
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

        <Button
          color="primary"
          type="submit"
          variant="contained"
          style={{ width: "200px" }}
        >
          register
        </Button>
      </form>
      <br />
      <span style={{ color: "gray" }}>already a member?</span>
      <br />
      <Link
        underline="none"
        onClick={() => {
          nav("/login");
        }}
      >
        log in
      </Link>
    </div>
  );
}

export default RegisterPage;
