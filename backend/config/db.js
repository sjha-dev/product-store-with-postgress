import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST,PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// create a sql connection using our neon database credentials
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`
)

// this sql function will be used to query our database in the backend

