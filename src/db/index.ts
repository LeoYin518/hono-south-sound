import { drizzle } from "drizzle-orm/mysql2";
import env from "../env.js";

const db = drizzle(env.DATABASE_URL);

export default db;
