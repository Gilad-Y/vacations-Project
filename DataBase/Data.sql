CREATE DATABASE  IF NOT EXISTS `project_3` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project_3`;
-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: project_3
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes_table`
--

DROP TABLE IF EXISTS `likes_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes_table` (
  `userCode` int NOT NULL,
  `vacationCode` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes_table`
--

LOCK TABLES `likes_table` WRITE;
/*!40000 ALTER TABLE `likes_table` DISABLE KEYS */;
INSERT INTO `likes_table` VALUES (41,12),(44,16),(44,12),(44,17),(44,15);
/*!40000 ALTER TABLE `likes_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_table`
--

DROP TABLE IF EXISTS `users_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_table` (
  `userCode` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  PRIMARY KEY (`userCode`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_table`
--

LOCK TABLES `users_table` WRITE;
/*!40000 ALTER TABLE `users_table` DISABLE KEYS */;
INSERT INTO `users_table` VALUES (1,'Gilad','Yitzhak','yitzhakgilad64@gmail.com','admin','admin'),(41,'gilad','yitzhak','gili6788@gmail.com','regular','regular'),(42,'nir','yitzhak','niry.3d@gmail.com','nirnirnir','regular'),(43,'test','user','testUser@gmail.com','12345','regular'),(44,'maor','agever','agever@gmail.com','12345','regular');
/*!40000 ALTER TABLE `users_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation_table`
--

DROP TABLE IF EXISTS `vacation_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation_table` (
  `vacationCode` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(225) NOT NULL,
  `description` varchar(225) NOT NULL,
  `startingDate` date NOT NULL,
  `endingDate` date NOT NULL,
  `price` int NOT NULL,
  `fileName` varchar(225) NOT NULL,
  PRIMARY KEY (`vacationCode`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation_table`
--

LOCK TABLES `vacation_table` WRITE;
/*!40000 ALTER TABLE `vacation_table` DISABLE KEYS */;
INSERT INTO `vacation_table` VALUES (25,'Bali, Indonesia','Experience the exotic beaches and lush landscapes of Bali. Enjoy water sports, explore ancient temples, and savor delicious local cuisine.','2023-08-15','2023-08-25',2000,'bali.jpeg'),(26,'Paris, France','Fall in love with the romantic city of Paris. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and indulge in French delicacies.','2023-09-10','2023-09-18',3000,'paris.jpeg'),(27,'Tokyo, Japan','Immerse yourself in the vibrant culture of Tokyo. Explore modern metropolises, historic temples, and relish authentic sushi.','2023-10-05','2023-10-15',2500,'tokyo.jpeg'),(28,'Cancun, Mexico','Enjoy the sun-kissed beaches and turquoise waters of Cancun. Take part in water activities, visit Mayan ruins, and savor Mexican cuisine.','2023-11-02','2023-11-10',2200,'cancun.jpeg'),(29,'Cape Town, South Africa','Discover the stunning beauty of Cape Town. Experience wildlife safaris, explore Table Mountain, and indulge in local wines.','2023-12-01','2023-12-12',3500,'cape_town.jpeg'),(30,'New York City, USA','Experience the hustle and bustle of New York City. Visit iconic landmarks, enjoy Broadway shows, and try diverse cuisines.','2024-01-08','2024-01-15',2500,'new_york.jpeg'),(31,'Sydney, Australia','Explore the vibrant city of Sydney. Enjoy stunning beaches, visit the Sydney Opera House, and experience the unique wildlife.','2024-02-19','2024-02-27',4000,'sydney.jpeg'),(32,'Rome, Italy','Discover the ancient history of Rome. Visit the Colosseum, Vatican City, and enjoy mouthwatering Italian cuisine.','2024-03-14','2024-03-22',2800,'rome.jpeg'),(33,'Vancouver, Canada','Experience the natural beauty of Vancouver. Explore national parks, enjoy outdoor activities, and savor local seafood.','2024-04-10','2024-04-18',2200,'vancouver.jpeg'),(34,'Barcelona, Spain','Immerse yourself in the vibrant culture of Barcelona. Visit stunning architecture, relax on beautiful beaches, and taste tapas.','2024-05-05','2024-05-15',2500,'barcelona.jpeg'),(35,'Dubai, UAE','Experience the luxury and modernity of Dubai. Visit skyscrapers, go on desert safaris, and enjoy shopping at extravagant malls.','2024-06-20','2024-06-28',5000,'dubai.jpeg'),(36,'Rio de Janeiro, Brazil','Discover the vibrant spirit of Rio de Janeiro. Enjoy the famous Carnival, relax on Copacabana Beach, and explore Sugarloaf Mountain.','2024-07-15','2024-07-25',2800,'rio.jpeg');
/*!40000 ALTER TABLE `vacation_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-31 19:24:19
