import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

@Injectable()
export class DrizzleProvider implements OnModuleInit {
  db: BetterSQLite3Database;

  async onModuleInit() {
    const sqlite = new Database('sqlite.db');
    this.db = drizzle(sqlite);

    migrate(this.db, {migrationsFolder: './src/db/migrations'});
  }
}
