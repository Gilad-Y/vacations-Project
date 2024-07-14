import { likeModel } from "../Models/likeModel";
import { vacationModel } from "../Models/vacationModel";
import dal_mysql from "../Utils/dal_mysql";
const fs = require("fs");
const dataUri = require("data-uri");

const addVacation = async (vacationInfo: vacationModel) => {
  const SQLcmd = `
INSERT INTO vacation_table (destination, description, startingDate, endingDate, price,fileName) VALUES 
('${vacationInfo.destination}', 
'${vacationInfo.description}',
 '${vacationInfo.startingDate}',
  '${vacationInfo.endingDate}', 
  ${vacationInfo.price},
  '${vacationInfo.fileName}');
`;
  const data = await dal_mysql.execute(SQLcmd);
  vacationInfo.vacationCode = data.insertId;
  return [vacationInfo];
};
const getVacations = async () => {
  const SQLcmd = `
  SELECT * FROM vacation_table
  ORDER BY startingDate ASC
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getVacationById = async (id: number) => {
  const SQLcmd = `
  SELECT * FROM vacation_table WHERE vacationCode=${id}
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getFilter = async () => {
  // Get current date in 'YYYY-MM-DD' format
  const curr_date = new Date().toISOString().split("T")[0];

  const SQLcmd = `
    SELECT * FROM vacation_table
    WHERE startingDate < '${curr_date}' AND endingDate > '${curr_date}'
    ORDER BY startingDate ASC
  `;

  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getFutureVacations = async () => {
  const curr_date = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format

  const SQLcmd = `
    SELECT * FROM vacation_table
    WHERE startingDate > '${curr_date}'
    ORDER BY startingDate ASC
  `;

  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const deleteVacation = async (id: number) => {
  const SQLcmd = `
DELETE FROM vacation_table
WHERE vacationCode=${id}
`;
  await dal_mysql.execute(SQLcmd);
  return id;
};
const updateVacation = async (vacation: vacationModel) => {
  //UPDATE `project_3`.`vacation_table` SET `destination` = 'i am testing', `description` = 'update', `startingDate` = '2023-06-10', `endingDate` = '2023-06-08', `price` = '2' WHERE (`vacationCode` = '16');
  const SQLcmd = `
UPDATE vacation_table SET destination = '${vacation.destination}',
 description = '${vacation.description}', startingDate = '${vacation.startingDate}', 
 endingDate = '${vacation.endingDate}', price = ${vacation.price}, fileName='${vacation.fileName}' WHERE
 (vacationCode = '${vacation.vacationCode}')
`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const addLike = async (likeInfo: likeModel) => {
  const SQLcmd = `
INSERT INTO likes_table (userCode,vacationCode) VALUES 
('${likeInfo.userCode}', 
  '${likeInfo.vacationCode}');
`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const deleteLike = async (likeInfo: likeModel) => {
  const SQLcmd = `
  DELETE FROM likes_table
  WHERE userCode=${likeInfo.userCode} AND vacationCode=${likeInfo.vacationCode}
  `;
  // const data=likeInfo
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const getAllLikes = async () => {
  const SQLcmd = `
  SELECT * FROM likes_table
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getLikes = async () => {
  const SQLcmd = `
    SELECT likes_table.*, destination
FROM likes_table JOIN vacation_table
ON likes_table.vacationCode=vacation_table.vacationCode
    `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const filterLikes = async (userCode: number) => {
  const SQLcmd = `
      SELECT vacation_table.*, userCode
 FROM vacation_table JOIN likes_table
 ON vacation_table.vacationCode=likes_table.vacationCode
 WHERE likes_table.userCode=${userCode}
      `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const makeFile = (data: any, response: any) => {
  const csvContent = Object.entries(data.graphData)
    .map(([destination, followers]) => `${destination},${followers}`)
    .join("\n");

  const csvData = `Destination,Followers\n${csvContent}`;

  // Set appropriate headers for the response
  response.setHeader(
    "Content-Disposition",
    "attachment; filename=VacationFollowers.csv"
  );
  response.setHeader("Content-Type", "text/csv");

  // Write the CSV data directly to the response
  response.send(csvData);
};

const uploadImg = async (files: any) => {
  if (!files || !files.file) {
    return "no file";
  }
  let uploadedFile;
  if (Array.isArray(files.file)) {
    uploadedFile = files.file[0];
  } else {
    uploadedFile = files.file;
  }

  const fileName = uploadedFile.name;
  uploadedFile.mv(`upload/${fileName}`, (error: any) => {
    if (error) {
      console.error(error);
      return "failed";
    } else {
      return "file upload successful";
    }
  });
};

const getImgUrl = (img: string) => {
  const filePath = `upload/${img}`;
  const fileData = fs.readFileSync(filePath);
  const base64Data = fileData.toString("base64");
  const imageUrl = `data:image/jpeg;base64,${base64Data}`;
  return imageUrl;
};
export {
  getVacations,
  getVacationById,
  addVacation,
  getFilter,
  getFutureVacations,
  deleteVacation,
  updateVacation,
  addLike,
  deleteLike,
  getAllLikes,
  makeFile,
  getLikes,
  filterLikes,
  uploadImg,
  getImgUrl,
};

//INSERT INTO `project_3`.`vacation_table` (`destination`, `description`, `startingDate`, `endingDate`, `price`) VALUES ('israel', 'eat good food', '06/06/2001', '07/07/1997', '100');

//UPDATE `project_3`.`vacation_table` SET `destination` = 'rfsdbv', `description` = 'sevsev', `startingDate` = '2023-06-21', `endingDate` = '2023-06-07', `price` = '237' WHERE (`vacationCode` = '13');
