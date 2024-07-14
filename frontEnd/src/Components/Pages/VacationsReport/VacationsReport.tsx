import { useEffect, useRef, useState } from "react";
import "./VacationsReport.css";
import store from "../../../redux/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VacationsReport(): JSX.Element {
  const nav = useNavigate();
  const [graphData, setGraph] = useState<any>();
  const color = "rgb(38, 150, 230)";
  useEffect(() => {
    const getLikesData = async () => {
      const vacationData = store.getState().vacations.vacation;
      const vacationCodesArray = (
        await axios.get("http://localhost:4000/api/v1/vacation/getLikes")
      ).data;
      const countObj: { [key: string]: number } = {};
      vacationData.forEach((vacation) => {
        countObj[vacation.destination] = 0;
      });
      vacationCodesArray.forEach((vacationCode: any) => {
        if (countObj[vacationCode.destination]) {
          countObj[vacationCode.destination]++;
        } else {
          countObj[vacationCode.destination] = 1;
        }
      });

      setGraph(countObj);
      // console.log('sorted', countObj);
      // console.log('labels', Object.keys(countObj));
      // console.log('data', Object.values(countObj));
      // console.log(graphData)
    };
    getLikesData();
  }, []);

  useEffect(() => {
    if (!store.getState().users.user[0]?.firstName) {
      nav("/");
    }
    if (graphData) {
      setData({
        labels: Object.keys(graphData),
        datasets: [
          {
            label: "Likes",
            data: Object.values(graphData),
            backgroundColor: [color],
            borderColor: [color],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [graphData]);
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Likes",
        data: [],
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1,
      },
    ],
  });
  const exportData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/vacation/makeCSV",
        {
          params: { graphData },
          responseType: "blob", // Set the response type to 'blob'
        }
      );

      // Create a temporary URL object
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element and simulate a click to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "VacationFollowers.csv";
      link.click();

      // Cleanup: Revoke the temporary URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV file:", error);
    }
  };

  return (
    <div className="VacationsReport">
      <Typography variant="h4" color="primary" style={{ textAlign: "center" }}>
        Vacations Report
      </Typography>
      <Bar data={data} />
      <div style={{ textAlign: "center" }}>
        <Button variant="contained" color="info" onClick={() => exportData()}>
          export data
        </Button>
      </div>
    </div>
  );
}

export default VacationsReport;
