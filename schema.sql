CREATE DATABASE topsongs_DB;

USE topsongs_DB;

CREATE TABLE Top5000 (
  id INT NOT NULL AUTO_INCREMENT,
  position INT NOT NULL,
  artist_name VARCHAR(120) NOT NULL,
  song_name VARCHAR(100) NOT NULL,
  year INT,
  pop_score Decimal(10,4) NULL,
  pop_scores_us Decimal(10,4) NULL,
  pop_scores_uk Decimal(10,4) NULL,
  pop_scores_europe Decimal(10,4) NULL ,
  pop_scores_row Decimal(10,4) NULL ,
  PRIMARY KEY (id)
);

SELECT * FROM top5000;
