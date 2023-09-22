import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CoreModule } from "./core/core.module";
import { PrismaModule } from "./lib/prisma";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
