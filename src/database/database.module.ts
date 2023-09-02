import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

const env = dotenv.config();

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: env.parsed.DB_NAME,
            host: env.parsed.DB_HOST,
            username: env.parsed.DB_USERNAME,
            password: env.parsed.DB_PASSWORD,
            entities: [DigimonEntity],
            synchronize: true,
        })]
})

export class DatabaseModule {
}
