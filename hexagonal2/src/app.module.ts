import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { InfraestructureModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [ConfigurationModule, CommonModule, ProductsModule, CoreModule, InfraestructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
