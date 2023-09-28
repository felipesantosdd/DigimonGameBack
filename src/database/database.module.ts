import { EggEntity } from '../egg/database/egg.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import * as dotenv from 'dotenv';
import { TamerEntity } from '../tamer/database/tamer.entity';
import { ItemEntity } from '../item/database/item.entity';
import { MissionsEntity } from '../missions/database/missions.entity';

const env = dotenv.config();

console.log(env.parsed)

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: env.parsed.DB_NAME,
            host: env.parsed.DB_HOST,
            port: Number(env.parsed.DB_PORT),
            username: env.parsed.DB_USERNAME,
            password: env.parsed.DB_PASSWORD,
            entities: [DigimonEntity, EggEntity, TamerEntity, ItemEntity, MissionsEntity],
            synchronize: true,
            // ssl: {
            //     rejectUnauthorized: false,
            // },
        })]
})

export class DatabaseModule {
}
