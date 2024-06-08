import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          logging: true,
          type: 'postgres',
          synchronize: false,
          autoLoadEntities: true,
          url: process.env.DB_CONN,
        }
      }
    })
  ],
})
export class AppModule { }
