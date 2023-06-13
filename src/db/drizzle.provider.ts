import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

@Injectable()
export class DrizzleProvider implements OnModuleInit {
  db: BetterSQLite3Database;

  async onModuleInit() {
    const sqlitedb = require('better-sqlite3');

    const newDb = new sqlitedb('sqlite.db' , sqlitedb.OPEN_READWRITE, (err) => {
      if (err) {
          console.error(err.message);
      }
      verbose: console.log}
    );
    this.db = drizzle(newDb);

    migrate(this.db, {migrationsFolder: './src/db/migrations'});
  }
}
