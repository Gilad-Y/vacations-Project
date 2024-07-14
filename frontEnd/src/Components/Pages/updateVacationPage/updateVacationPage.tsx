import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@mui/joy/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { vacationModel } from "../../../Models/vacationModel";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import store from "../../../redux/store";
import "./updateVacationPage.css";

function UpdateVacationPage(): JSX.Element {
  const nav = useNavigate();
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<vacationModel>();
  const [vacation, setUpdated] = useState<vacationModel>();
  const [destination, setDes] = useState<string>("");
  const [description, setDesc] = useState<string>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [price, setPrice] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const param = useParams();

  const updateVacation = (data: vacationModel) => {
    data.fileName = selectedFile ? selectedFile.name : fileName;
    data.vacationCode = param.id ? +param.id : 0;
    data.description = data.description ? data.description : description;
    data.destination = data.destination ? data.destination : destination;
    data.startingDate = data.startingDate ? data.startingDate : start;
    data.endingDate = data.endingDate
      ? data.endingDate
      : new Date(end.toISOString().split("T")[0]);
    data.price = data.price ? data.price : price;
    console.log(data);
    axios.put(
      `http://localhost:4000/api/v1/vacation/updateVacation/${param.id}`,
      data
    );
    nav("/vacation");
  };

  useEffect(() => {
    const user = store.getState().users.user[0]?.firstName;
    if (!user) {
      nav("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/vacation/getById/${param.id}`)
      .then((res) => {
        const vacationData = res.data[0];
        const formattedStartDate = vacationData.startingDate.split("T")[0];
        const formattedEndDate = vacationData.endingDate.split("T")[0];
        console.log(formattedEndDate);
        setUpdated(vacationData);
        setDes(vacationData.destination);
        setDesc(vacationData.description);
        setStart(new Date(formattedStartDate));
        setEnd(new Date(formattedEndDate));
        setPrice(vacationData.price);
        setFileName(vacationData.fileName);
        setValue("destination", vacationData.destination);
        setValue("description", vacationData.description);
        setValue("startingDate", formattedStartDate);
        setValue("endingDate", formattedEndDate);
        console.log(end);
        setValue("price", vacationData.price);
      });
  }, [param.id, setValue]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("file", file);
      axios
        .post("http://localhost:4000/api/v1/vacation/upload", formData)
        .then((res) => {});
    }
  };

  const startingDate = watch("startingDate");
  const endingDate = watch("endingDate");

  useEffect(() => {
    if (endingDate && new Date(endingDate) < new Date(startingDate)) {
      reset({ endingDate: "" as any });
    }
  }, [startingDate, endingDate, setValue]);

  return (
    <div className="updateVacationPage">
      <Typography variant="h4" color="primary">
        Update Vacation
      </Typography>
      <br />
      <form onSubmit={handleSubmit(updateVacation)}>
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>destination</FormLabel>
          <Input
            type="text"
            {...register("destination")}
            value={destination}
            onChange={(e) => setDes(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left" }}>description</FormLabel>
          <textarea
            style={{ maxWidth: "200px", minWidth: "200px", maxHeight: "120px" }}
            defaultValue={description}
            {...register("description")}
            onChange={(e) => setDesc(e.target.value)}
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
            onChange={(e) => setStart(new Date(e.target.value))}
            type="date"
            value={
              start instanceof Date ? start.toISOString().split("T")[0] : start
            }
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
            onChange={(e) => {
              const selectedEndDate = new Date(e.target.value);
              if (selectedEndDate < start) {
                setEnd("" as any);
              } else {
                setEnd(selectedEndDate);
              }
            }}
            type="date"
            value={end instanceof Date ? end.toISOString().split("T")[0] : end}
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel style={{ textAlign: "left", width: "200px" }}>
            price
          </FormLabel>
          <Input
            {...register("price")}
            onChange={(e) => setPrice(+e.target.value)}
            type="number"
            sx={{ width: "200px" }}
            startDecorator={"$"}
            required
            value={price}
            slotProps={{
              input: {
                min: 0,
                max: 10000,
              },
            }}
          />
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
                onChange={handleFileUpload}
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
          Update Vacation
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

export default UpdateVacationPage;
