import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { CONFIG_DATABASE } from './common/infrastructure/config-database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CONFIG_DATABASE(),
    ProductsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
