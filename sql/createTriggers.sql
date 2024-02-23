DELIMITER //

CREATE TRIGGER faculty_after_insert
AFTER INSERT ON Faculty
FOR EACH ROW
BEGIN
  -- Insert a new account for the faculty member
  INSERT INTO Account (username, password) VALUES (NEW.email, NEW.password);
END;
//

CREATE TRIGGER admin_after_insert
AFTER INSERT ON Admin
FOR EACH ROW
BEGIN
  -- Insert a new account for the admin
  INSERT INTO Account (username, password) VALUES (NEW.email, NEW.password);
END;
//

DELIMITER ;