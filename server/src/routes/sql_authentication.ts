import express from "express";
import { UserAuth } from "../../assets/types";
import { openSQLDatabase, closeSQLDatabase } from "../utils/sqlConnection";
import log from "../utils/logger";
import { z } from "zod";

// Demonstration on how to Use/Interact with a SQL Database (Insert, Delete, Update):
const router = express.Router();

enum USER_LEVEL {
  ADMIN = "admin",
  OWNER = "owner",
  EMPLOYEE = "employee",
  CUSTOMER = "customer",
  OTHER = "reg_user"
}

// Test Code for Schema Validation
// const schema = z.object({
//     username: z.string(),
//     password: z.string(),
//     user_level: z.enum(["admin", "owner", "employee", "customer", "reg_user"])
// });

// type UserSchema = z.infer<typeof schema>;

// const newObj: UserSchema = {
//     username: "user",
//     password: "pass",
//     user_level: USER_LEVEL.ADMIN
// };

// const schemaVerifyResult = schema.safeParse(newObj);
// console.log(schemaVerifyResult);

router.get("/api/user", async (_, res) => {
  const rows = await getUsers();
  if (rows !== null) return res.status(200).json(rows);
  else return res.status(400).send({ message: "GET - FAILED" });
});

router.post("/api/user", async (req, res) => {
  const insertFields: UserAuth = {
    username: req.body.username as string,
    password: req.body.password as string,
    user_level: req.body.user_level as string
  };
  const result = await insertUser(insertFields);
  if (result === true) return res.status(201).send({ message: "INSERT - TRUE" });
  else return res.status(400).send({ message: "INSERT - FALSE" });
});

router.delete("/api/user", async (req, res) => {
  const userIdToDelete = req.body.id as number;
  const result = await deleteUser(userIdToDelete);
  if (result === true) return res.status(200).send({ message: "DELETE - TRUE" });
  else return res.status(400).send({ message: "DELETE - FALSE" });
});

router.put("/api/user", async (req, res) => {
  const userIdToUpdate = req.body.id as number;
  const updateFields: UserAuth = {
    username: req.body.username as string,
    password: req.body.password as string,
    user_level: req.body.user_level as string
  };
  const result = await updateUser(userIdToUpdate, updateFields);
  if (result === true) return res.status(200).send({ message: "UPDATE - TRUE" });
  else return res.status(400).send({ message: "UPDATE - FALSE" });
});

async function getUsers() {
  const sqlDatabase = openSQLDatabase();

  const getQuery = `SELECT * FROM AUTHENTICATION`;
  try {
    const rows = await new Promise((resolve, reject) => {
      sqlDatabase.all(getQuery, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
    return rows;
  } catch (err: any) {
    log.error(err.message);
  } finally {
    closeSQLDatabase(sqlDatabase);
  }

  return null;
}

async function insertUser(insertFields: UserAuth) {
  const sqlDatabase = openSQLDatabase();

  const insertQuery = `INSERT INTO AUTHENTICATION (username, password, user_level) VALUES (?, ?, ?)`;
  sqlDatabase.run(insertQuery, [insertFields.username, insertFields.password, insertFields.user_level], (err) => {
    if (err) {
      log.error(err.message);
      return false;
    }
    log.info("SUCESSFULLY INSERTED INTO THE SQL DATABASE");
  });

  closeSQLDatabase(sqlDatabase);
  return true;
}

async function deleteUser(deleteUserId: number) {
  const sqlDatabase = openSQLDatabase();

  const deleteQuery = `DELETE FROM AUTHENTICATION WHERE id = (?)`;
  sqlDatabase.run(deleteQuery, [deleteUserId], (err) => {
    if (err) {
      log.error(err.message);
      return false;
    }
    log.info("SUCESSFULLY DELETED FROM THE SQL DATABASE");
  });

  closeSQLDatabase(sqlDatabase);
  return true;
}

async function updateUser(updateUserId: number, updateFields: UserAuth) {
  const sqlDatabase = openSQLDatabase();

  const updateQuery = `UPDATE AUTHENTICATION SET username = (?), password = (?), user_level = (?) WHERE id = (?)`;
  sqlDatabase.run(
    updateQuery,
    [updateFields.username, updateFields.password, updateFields.user_level, updateUserId],
    (err) => {
      if (err) {
        log.error(err.message);
        return false;
      }
      log.info("SUCESSFULLY UPDATED FROM THE SQL DATABASE");
    }
  );

  closeSQLDatabase(sqlDatabase);
  return true;
}

// export { insertUser, deleteUser, updateUser, router as userRouter };
