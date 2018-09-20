
DROP TABLE FeelingRecords;
DROP TABLE Users;
DROP TABLE Teams;

CREATE TABLE Teams (
    team_id INT(4) PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(31) NOT NULL
);

CREATE TABLE Users (
    user_id INT(4) PRIMARY KEY AUTO_INCREMENT,
    nick_name VARCHAR(26) NOT NULL,
    passwd VARCHAR(31) NOT NULL,
    first_name VARCHAR(31) NOT NULL,
    last_name VARCHAR(31) NOT NULL,
    user_role VARCHAR(10) NOT NULL,
    registered_for_survey tinyint(1),
    team_id INT(4),
    CONSTRAINT fk_team_id FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

CREATE TABLE FeelingRecords (
    id INT(32) PRIMARY KEY AUTO_INCREMENT,
    feeling TINYINT(4),
    time_stamp DATE,
    team_id INT(4),
    CONSTRAINT fk_team_id_feeling FOREIGN KEY  (team_id) REFERENCES Teams(team_id)
);
