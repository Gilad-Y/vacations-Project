import express, { NextFunction, Request, Response } from "express";
import {
  addLike,
  addVacation,
  deleteLike,
  deleteVacation,
  filterLikes,
  getAllLikes,
  getFilter,
  getFutureVacations,
  getLikes,
  getVacationById,
  getVacations,
  makeFile,
  updateVacation,
  uploadImg,
} from "../Logic/vacationLogic";
const router = express.Router();

router.post(
  "/upload",
  async (request: any, response: any, next: NextFunction) => {
    console.log(request.body);
    console.log(request.files);
    const data = await uploadImg(request.files);
    switch (data as string) {
      case "no file":
        response.status(400).json({ error: "No file uploaded" });
        break;
      case "failed":
        response.status(500).json({ error: "File upload failed" });
        break;
      case "file upload successful":
        response.status(201).json({ status: "File uploaded successfully" });
    }
  }
);

router.post(
  "/addVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationInfo = request.body;
    console.log(vacationInfo);
    response.status(201).json(await addVacation(vacationInfo));
  }
);
router.get(
  "/getAll",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await getVacations());
  }
);
router.get(
  "/getById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json(await getVacationById(id));
  }
);
router.get(
  "/getAllActive",
  async (request: Request, response: Response, next: NextFunction) => {
    // const filter = request.query.variant;
    response.status(200).json(await getFilter());
  }
);
router.get(
  "/getFutureVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await getFutureVacations());
  }
);
router.delete(
  "/deleteVacation/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;

    response.status(200).json(await deleteVacation(id));
  }
);
router.put(
  "/updateVacation/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    const updatedVacation = request.body;
    response.status(200).json(updateVacation(updatedVacation));
  }
);
router.post(
  "/addLike",
  async (request: Request, response: Response, next: NextFunction) => {
    const likeInfo = request.body;
    // console.log('like info is....',likeInfo)
    response.status(201).json(await addLike(likeInfo));
  }
);
router.delete(
  "/removeLike",
  async (request: Request, response: Response, next: NextFunction) => {
    // const likeInfo={vacationCode:request.params.vacationCode,userCode:request.params.userCode};
    // console.log('like to delete is....',likeInfo)
    const likeInfo = request.body;
    response.status(200).json(await deleteLike(likeInfo));
  }
);
router.get(
  "/getAllLikes",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await getAllLikes());
  }
);
router.get(
  "/getLikes",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await getLikes());
  }
);
router.get(
  "/filterLikes",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.query.user_code ? request.query.user_code : 0;
    response.status(200).json(await filterLikes(+id));
  }
);
router.get("/imgUrl/:img", async (request, response) => {
  const img = request.params.img;
  const imageUrl = `${request.protocol}://${request.get("host")}/upload/${img}`;
  response.status(200).json({ imageUrl });
});
router.get(
  "/makeCSV",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.query;
      makeFile(data, response);
    } catch (error) {
      console.error("Error generating CSV file:", error);
      response.status(500).json({ error: "Failed to generate CSV file" });
    }
  }
);

export default router;
