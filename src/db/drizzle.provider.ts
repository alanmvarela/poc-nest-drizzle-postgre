import { Injectable, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { ConfigService } from '@nestjs/config';
import * as schema from './schema';
import { Pool } from 'pg';



@Injectable()
export class DrizzleProvider implements OnModuleInit {
  db: NodePgDatabase<typeof schema>;
  
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const database = this.configService.get<string>('db.database');
    const user = this.configService.get<string>('db.user');
    const password = this.configService.get<string>('db.password');
    const port = this.configService.get<string>('db.port');
    const host = this.configService.get<string>('db.host');

    const pool = new Pool({
      connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
    });
    this.db = drizzle(pool, { schema });
    migrate(this.db, {migrationsFolder: './src/db/migrations'});

    this.db = drizzle(pool, { schema });
    await migrate(this.db, { migrationsFolder: './src/db/migrations' });
  }
}
