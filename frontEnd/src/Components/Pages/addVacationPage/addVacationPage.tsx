import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import store from "../../../redux/store";
import { vacationModel } from "../../../Models/vacationModel";
import Input from "@mui/joy/Input";
import "./addVacationPage.css";

function AddVacationPage(): JSX.Element {
  const nav = useNavigate();
  const { register, handleSubmit, watch, reset } = useForm<vacationModel>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  function getFormattedDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const addVacation = (data: vacationModel) => {
    data.fileName = selectedFile ? selectedFile.name : "";
    console.log(data);
    axios
      .post("http://localhost:4000/api/v1/vacation/addVacation", data)
      .then(() => {
        nav("/vacation");
      });
  };

  useEffect(() => {
    const user = store.getState().users.user[0]?.firstName;
    if (!user) {
      nav("/login");
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(event.target.files);
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("file", file);
      console.log(formData);
      axios
        .post("http://localhost:4000/api/v1/vacation/upload", formData)
        .then((res) => {
          console.log(res);
        });
    }
  };

  const startingDate = watch("startingDate");
  const endingDate = watch("endingDate");

  useEffect(() => {
    if (endingDate && new Date(endingDate) < new Date(startingDate)) {
      reset({ endingDate: "" as any });
    }
  }, [startingDate, endingDate, reset]);

  return (
    <div className="addVacationPage">
      <Typography variant="h4" color="primary">
        Add Vacation
      </Typography>
      <br />
      <form onSubmit={handleSubmit(addVacation)}>
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>destination</FormLabel>
          <Input type="text" {...register("destination")} required />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>description</FormLabel>
          <textarea
            style={{ maxWidth: "200px", minWidth: "200px" }}
            {...register("description")}
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left", width: "200px" }}>
            start on
          </FormLabel>
          <Input
            {...register("startingDate")}
            type="date"
            slotProps={{
              input: {
                min: getFormattedDate(),
              },
            }}
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left", width: "200px" }}>
            end on
          </FormLabel>
          <Input
            {...register("endingDate")}
            slotProps={{
              input: {
                min: getFormattedDate(),
              },
            }}
            type="date"
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left", width: "200px" }}>
            price
          </FormLabel>
          <Input {...register("price")} type="number" required />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left", width: "200px" }}>
            cover image
          </FormLabel>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1_ygj6jn8XmBq1FUIDH63AJQusu02O5HsA&usqp=CAU"
              }
              alt="box image"
              style={{
                height: 112.5,
                width: 200,
                border: "1px solid lightgrey",
              }}
            />
            <Button
              component="label"
              htmlFor="file-upload"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                width: 90,
              }}
              color="neutral"
            >
              Select image
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onInput={handleFileUpload}
                required
              />
            </Button>
          </Box>
        </FormControl>
        <br />
        <Button
          color="primary"
          style={{ width: "200px" }}
          type="submit"
          variant="solid"
        >
          Add Vacation
        </Button>
        <br />
        <Button
          color="neutral"
          style={{ width: "200px" }}
          onClick={() => {
            nav("/vacation");
          }}
          variant="outlined"
        >
          cancel
        </Button>
      </form>
    </div>
  );
}

export default AddVacationPage;
