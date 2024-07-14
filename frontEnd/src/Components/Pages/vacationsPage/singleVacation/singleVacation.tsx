import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  ToggleButton,
} from "@mui/material";
import "./singleVacation.css";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import Modal from "@mui/material/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { deleteVacation } from "../../../../redux/vacationReducer";
import axios from "axios";
import { vacationModel } from "../../../../Models/vacationModel";
import { useNavigate } from "react-router-dom";
import { downloadLike } from "../../../../redux/likesReducer";
import store from "../../../../redux/store";
import zIndex from "@mui/material/styles/zIndex";
interface itemProps {
  key: number;
  destination: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  price: number;
  fileName: string;
  id: number;
  // like:likeModel[],
  setVacations: React.Dispatch<React.SetStateAction<vacationModel[]>>;
}
function SingleVacation(props: itemProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const nav = useNavigate();
  const [isAdmin, setAdmin] = useState(false);
  const likeObj = {
    vacationCode: props.id,
    userCode: store.getState().users.user[0].userCode,
  };
  useEffect(() => {
    if (store.getState().users.user[0]?.userType == "admin") {
      setAdmin(true);
    }
    store.getState().likes.likes.map((item) => {
      if (item.vacationCode == props.id) {
        setLikeCount((prevCount) => prevCount + 1);
      }
      if (
        item.userCode == store.getState().users.user[0].userCode &&
        item.vacationCode == props.id
      ) {
        setLiked(true);
      }
    });
  }, []);
  const updateLikes = () => {
    axios
      .get("http://localhost:4000/api/v1/vacation/getAllLikes")
      .then((res) => {
        store.dispatch(downloadLike(res.data));
        // console.log(res.data)
        // props.like=res.data
      });
  };
  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
      axios.delete("http://localhost:4000/api/v1/vacation/removeLike", {
        data: {
          vacationCode: props.id,
          userCode: store.getState().users.user[0].userCode,
        },
      });
    } else {
      setLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
      axios.post("http://localhost:4000/api/v1/vacation/addLike", likeObj);
    }
    updateLikes();
  };
  const handleEdit = (id: number) => {
    nav(`/updateVacation/${id}`);
    closeModal();
  };

  const handleDelete = () => {
    handleOpen();
  };
  const deleteVacationFromModal = (id: number) => {
    axios
      .delete(`http://localhost:4000/api/v1/vacation/deleteVacation/${id}`)
      .then((res) => {
        store.dispatch(deleteVacation(res.data));
        props.setVacations(store.getState().vacations.vacation);
        console.log(res.data);
      });
    closeModal();
  };
  // const updateVacationFromModal=(id:number)=>{
  //  nav(`/updateVacation${id}`)
  //   closeModal()
  // }

  const handleOpen = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <>
        <Card
          sx={{
            maxWidth: 345,
            margin: "auto",
            border: "black solid",
            position: "relative", // Add relative positioning to the card
          }}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={`http://localhost:4000/upload/${props.fileName}`}
            title={props.fileName}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "10px",
                color: "white",
              }}
            >
              {props.destination}
            </Typography>
            {/* Remove the outer div and adjust positioning */}
            {isAdmin ? (
              <div
                className="adminBtn"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: "translate(2%, 10%)",
                }}
              >
                <Chip
                  icon={<EditIcon fontSize="small" />}
                  style={{ fontSize: "10px", backgroundColor: "lightgray" }}
                  label="Edit"
                  onClick={() => handleEdit(props.id)}
                />
                <Chip
                  icon={<DeleteIcon fontSize="small" />}
                  style={{
                    fontSize: "10px",
                    backgroundColor: "lightgray",
                    marginLeft: "5px",
                  }}
                  label="Delete"
                  onClick={handleDelete}
                />
              </div>
            ) : (
              <ToggleButton
                value="like"
                selected={liked}
                onChange={handleLikeToggle}
                style={{
                  borderRadius: "25px",
                  backgroundColor: liked ? "pink" : "lightgray",
                  height: "35px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: "translate(2%, 10%)",
                }}
              >
                {liked ? (
                  <FavoriteIcon color="error" fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{ color: "black", marginLeft: "5px" }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Like {likeCount}
                  </Typography>
                </Typography>
              </ToggleButton>
            )}
          </CardMedia>
          {/* Remove absolute positioning and add padding to the content */}
          <CardContent
            style={{
              padding: "0.01px",
              marginTop: "-10px",
            }}
          >
            <Typography
              variant="body2"
              style={{
                textAlign: "center",
                width: "345",
                backgroundColor: "rgb(160, 231, 254)",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            >
              <EventIcon /> {props.startingDate.toLocaleDateString("he-IL")}-
              {props.endingDate.toLocaleDateString("he-IL")}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  backgroundColor: "white",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              >
                {props.description}
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "400px" }}
            >
              {props.price}$
            </Button>
          </CardActions>
        </Card>
        <div className="singleVacation"></div>
      </>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={closeModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
            onClick={closeModal}
          />
          <Typography
            id="modal-title"
            // level="h4"
            // textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Delete?
          </Typography>
          <Typography id="modal-desc">
            are you sure you want to delete?
            <Card sx={{ maxWidth: 345, margin: "auto", border: "black solid" }}>
              <CardMedia
                sx={{ height: 140, position: "relative" }}
                image={`http://localhost:4000/upload/${props.fileName}`}
                title="uzumaki naruto"
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    padding: "10px",
                    color: "white",
                  }}
                >
                  uzumaki naruto {props.id}
                </Typography>
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(2%, 10%)",
                  }}
                >
                  {/* {isAdmin ? <div className="adminBtn"><Chip icon={<EditIcon fontSize="small" />} style={{ fontSize: '10px', backgroundColor: "lightgray" }} label="Edit" onClick={handleEdit} />
              <Chip icon={<DeleteIcon fontSize="small" />} style={{ fontSize: '10px', backgroundColor: "lightgray", marginLeft: "5px" }} label="Delete" onClick={handleDelete} />
            </div> :
              <ToggleButton
                value="like"
                selected={liked}
                onChange={handleLikeToggle}
                style={{
                  borderRadius: '25px',
                  backgroundColor: liked ? 'pink' : 'lightgray',
                  height: '35px',
                }}
              >
                {liked ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                <Typography variant="body2" color="text.primary" style={{ color: 'black', marginLeft: '5px' }}>
                  <Typography variant="body2" color="text.primary" style={{ color: 'black', fontSize: '10px', marginLeft: '5px' }}>
                    Like {likeCount}
                  </Typography>
                </Typography>
              </ToggleButton>} */}
                </div>
              </CardMedia>
              <CardContent>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "center",
                    width: "345",
                    backgroundColor: "lightblue",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                  }}
                >
                  <EventIcon /> {props.startingDate.toLocaleDateString()}-
                  {props.endingDate.toLocaleDateString()}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      backgroundColor: "white",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                    }}
                  >
                    {props.description}
                  </Typography>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ width: "400px" }}
                >
                  {props.price}$
                </Button>
              </CardActions>
            </Card>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={() => deleteVacationFromModal(props.id)}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={closeModal}
                startIcon={<KeyboardReturnIcon />}
              >
                Return
              </Button>
            </div>
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}

export default SingleVacation;
