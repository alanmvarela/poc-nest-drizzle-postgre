import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DrizzleProvider implements OnModuleInit {
  db: BetterSQLite3Database;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const sqlitedb = require('better-sqlite3');
    const sqlite_db_name = this.configService.get<string>('app.env') + '.db';

    const newDb = new sqlitedb(sqlite_db_name , sqlitedb.OPEN_READWRITE, (err) => {
      if (err) {
          console.error(err.message);
      }
    });
    this.db = drizzle(newDb);

    migrate(this.db, {migrationsFolder: './src/db/migrations'});
  }
}
