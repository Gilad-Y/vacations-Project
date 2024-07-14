import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleVacation from "./singleVacation/singleVacation";
import { downloadVacation } from "../../../redux/vacationReducer";
import axios from "axios";
import "./vacationsPage.css";
import ToggleButton from "@mui/material/ToggleButton";
import { Button } from "@mui/joy";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { vacationModel } from "../../../Models/vacationModel";
import { downloadLike } from "../../../redux/likesReducer";
import store from "../../../redux/store";

function VacationsPage(): JSX.Element {
  const [following, setFollowing] = useState(false);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(false);
  const [userName, setUser] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [vacations, setVacation] = useState<vacationModel[]>([]);
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [alignment, setAlignment] = useState("left");
  const children = [
    store.getState().users.user[0]?.userType == "regular" && (
      <ToggleButton
        value="check"
        selected={following}
        onClick={() => {
          setFollowing(!following);
          if (!following) {
            // console.log("i am active");
            const user_code = store.getState().users.user[0].userCode;
            // console.log(user_code);
            setActive(false);
            setStarted(false);
            axios
              .get("http://localhost:4000/api/v1/vacation/filterLikes", {
                params: { user_code },
              })
              .then((res) => {
                // console.log(res.data);
                setVacation(res.data);
              });
          } else {
            // console.log("i am not active");
            axios
              .get("http://localhost:4000/api/v1/vacation/getAll")
              .then((res) => {
                handleData(res.data);
              });
          }
        }}
        // className={following ? "selected" : ""}
      >
        following
      </ToggleButton>
    ),
    <ToggleButton
      value="check"
      selected={started}
      onClick={() => {
        setStarted(!started);
        if (!started) {
          // console.log("i am active");
          // console.log(started);
          setActive(false);
          setFollowing(false);
          axios
            .get("http://localhost:4000/api/v1/vacation/getFutureVacations")
            .then((res) => {
              // console.log(res);
              setVacation(res.data);
              // store.dispatch(res.data)
            });
        } else {
          // console.log("i am not active");
          axios
            .get("http://localhost:4000/api/v1/vacation/getAll")
            .then((res) => {
              handleData(res.data);
            });
        }
      }}
    >
      haven't started
    </ToggleButton>,
    <ToggleButton
      value="check"
      selected={active}
      onClick={() => {
        setActive(!active);
        if (!active) {
          // console.log("i am active");
          setStarted(false);
          setFollowing(false);
          // console.log(active);
          axios
            .get("http://localhost:4000/api/v1/vacation/getAllActive")
            .then((res) => {
              // console.log(res);
              setVacation(res.data);
              // store.dispatch(res.data)
            });
        } else {
          console.log("i am not active");
          axios
            .get("http://localhost:4000/api/v1/vacation/getAll")
            .then((res) => {
              handleData(res.data);
            });
        }
      }}
      // className={active ? "selected" : ""}
    >
      active
    </ToggleButton>,
  ];
  useEffect(() => {
    const user = store.getState().users.user[0]?.firstName;
    if (user) {
      setUser(user);
    } else {
      nav("/login");
    }
    getLikesData();
    axios
      .get("http://localhost:4000/api/v1/vacation/getAll")
      .then((response) => response.data)
      .then((result) => {
        handleData(result);
        setRefresh(!refresh);
      });
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
  const getLikesData = () => {
    axios
      .get("http://localhost:4000/api/v1/vacation/getAllLikes")
      .then((res) => {
        // console.log(res.data);
        // likes.current = res.data;
        store.dispatch(downloadLike(res.data));
      })
      .catch((error) => {
        console.log("Error fetching likes data:", error);
      });
  };
  const handleData = (data: vacationModel[]) => {
    setVacation(data);
    store.dispatch(downloadVacation(data));
    if (store.getState().vacations.vacation.length !== data.length) {
      setRefresh(!refresh);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = vacations.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="vacationsPageContainer">
      <div className="vacationsPage">
        {store.getState().users.user[0]?.userType === "admin" && (
          <Button
            style={{ textAlign: "center", margin: "auto", width: "300px" }}
            className="addVacationButton"
            onClick={() => {
              nav("/addVacation");
            }}
          >
            add vacation
          </Button>
        )}

        <div className="toggleButtonGroupContainer">
          <ToggleButtonGroup {...control} aria-label="Medium sizes">
            {children}
          </ToggleButtonGroup>
        </div>

        <div className="vacationCardContainer">
          {currentPosts.map((item) => (
            <div className="vacationCard">
              <SingleVacation
                key={item["vacationCode"]}
                destination={item["destination"]}
                description={item["description"]}
                startingDate={new Date(item["startingDate"])}
                endingDate={new Date(item["endingDate"])}
                price={item["price"]}
                fileName={item["fileName"]}
                id={item["vacationCode"]}
                setVacations={setVacation}
              />
            </div>
          ))}
        </div>

        <div className="paginationContainer">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(
                store.getState().vacations.vacation.length / postsPerPage
              )}
              variant="outlined"
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default VacationsPage;
