CREATE TABLE `leagues` (
  `lgID` char(2) NOT NULL,
  `league` varchar(50) NOT NULL,
  `active` char(1) NOT NULL,
  PRIMARY KEY (`lgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci