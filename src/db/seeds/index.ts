import { drizzle } from "drizzle-orm/better-sqlite3";
import env from "@/env.js";
import { reset, seed } from "drizzle-seed";
import * as schema from "../schema.js";

async function main() {
    const db = drizzle(env.DB_FILE_URL); // 例如 "./src/db/sqlite.db"
    await reset(db, schema);
    await seed(db, schema).refine((f) => ({
        user: {
            count: 1,
            with: {
                blog: 5,
                course: 5,
            }
        }
    }));
    console.log("✅ 种子执行成功");
}

main().catch((err) => {
    console.error("❌ 种子执行失败", err);
    process.exit(1);
});
