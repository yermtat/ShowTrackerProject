create database  ShowTrackerDB;
use ShowTrackerDB;
go;

CREATE TABLE WatchedShows(
	Id int IDENTITY(1000, 1) PRIMARY KEY,
	UserID uniqueidentifier NOT NULL,
	ShowID int NOT NULL
)
go;

CREATE TABLE WatchedEpisodes(
	WatchedShowId int not null,
	Season int not null,
	Episode int not null,
    foreign key (WatchedShowId) references WatchedShows(id) on delete cascade
)
go;


CREATE TRIGGER trg_CheckUserExists
    ON dbo.WatchedShows
    AFTER INSERT, UPDATE
    AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
                 LEFT JOIN [ShowTrackerAuthDB].Users u ON i.UserID = u.Id
        WHERE u.Id IS NULL
    )
        BEGIN
            RAISERROR('Ошибка целостности данных: UserID не существует в Auth_8.dbo.Users.', 16, 1);
            ROLLBACK TRANSACTION;
        END
END;

