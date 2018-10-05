DROP TABLE NotificationTriggerTimes;
DROP TABLE UserWorkingSpans;
DROP TABLE PushTokens;
DROP TABLE LoginSessions;
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
    my_feeling TINYINT(4),
    team_feeling TINYINT(4),
    time_stamp DATETIME,
    team_id INT(4),
    CONSTRAINT fk_team_id_feeling FOREIGN KEY  (team_id) REFERENCES Teams(team_id)
);

CREATE TABLE LoginSessions (
    id INT(32) PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(63) NOT NULL,
    user_id INT(4),
    CONSTRAINT fk_sess_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE PushTokens (
    id INT(32) PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(152) NOT NULL,
    user_id INT(4),
    platform VARCHAR(15),
    CONSTRAINT fk_pt_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT uni_token_user UNIQUE (token,user_id)
);

CREATE TABLE NotificationTriggerTimes (
    id INT(32) PRIMARY KEY AUTO_INCREMENT,
    seconds_to_trigger INT NOT NULL
);

CREATE TABLE UserWorkingSpans (
    id INT(32) PRIMARY KEY AUTO_INCREMENT,
    start_time TIME,
    end_time TIME,
    user_id INT(4),
    CONSTRAINT fk_uws_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Teams(team_name) VALUES("Dev team one");
INSERT INTO Users (nick_name, passwd, first_name, last_name, user_role, registered_for_survey, team_id) VALUES("jim", "", "Jim", "Buchans", "user", 1, 1);
INSERT INTO Users (nick_name, passwd, first_name, last_name, user_role, registered_for_survey, team_id) VALUES("tod", "", "Tod", "Peaters", "user", 0, 1);
INSERT INTO LoginSessions (token, user_id) VALUES ("a82b2-e324fa02-ac3b42d1", 1);
INSERT INTO PushTokens(user_id, token, platform) VALUES(1, "7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252", "ios");
INSERT INTO UserWorkingSpans (user_id, start_time, end_time) VALUES(1, '09:00', '17:00');

INSERT INTO NotificationTriggerTimes (seconds_to_trigger) VALUES(600);
INSERT INTO NotificationTriggerTimes (seconds_to_trigger) VALUES(10800);