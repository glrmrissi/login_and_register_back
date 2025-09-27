import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { KanbanBoardModule } from './kanban-board/kanban-board.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: String(process.env.DB_PASSWORD),
        database: process.env.DB_NAME,
        entities: [User],
        autoLoadEntities: true,
        // synchronize: process.env.ENV_DEVELOPMENT === "development",
        // logging: true,
    }),
    UserModule,
    KanbanBoardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
