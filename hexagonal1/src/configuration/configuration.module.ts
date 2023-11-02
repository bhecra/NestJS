import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_DATABASE } from './infrastructure/config-database';

@Module({
  imports: [ConfigModule.forRoot(), CONFIG_DATABASE()],
})
export class ConfigurationModule {}
