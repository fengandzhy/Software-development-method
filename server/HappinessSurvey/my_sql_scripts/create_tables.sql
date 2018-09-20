
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
    is_my_own_feeling TINYINT(1),
    team_id INT(4),
    CONSTRAINT fk_team_id_feeling FOREIGN KEY  (team_id) REFERENCES Teams(team_id)
);


INSERT INTO Teams(team_name) VALUES("Dev team one");
INSERT INTO Users (nick_name, passwd, first_name, last_name, user_role, registered_for_survey, team_id) VALUES("jim", "", "Jim", "Buchans", "user", 1, 1);
INSERT INTO Users (nick_name, passwd, first_name, last_name, user_role, registered_for_survey, team_id) VALUES("tod", "", "Tod", "Peaters", "user", 0, 1);
