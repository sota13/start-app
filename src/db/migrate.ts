import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, sql } from '.';




// This function will run migrations on the database, skipping the ones already applied
const migrateFn = async () => {
    console.log('start migrate')
    await migrate(db, { migrationsFolder: "./db/drizzle" });
    console.log('finished migrate migrate')

    // Don't forget to close the connection, otherwise the script will hang
    await sql.end();
}

migrateFn()