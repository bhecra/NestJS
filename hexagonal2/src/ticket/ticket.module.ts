import { Module } from '@nestjs/common';
import { TicketController } from './adapter/api/ticket.controller';
import { TicketService } from './domain/ports/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './adapter/db/ticket.entity';
import { ticketServiceProvider } from './domain/ticket.provider';

@Module({
  controllers: [TicketController],
  imports: [TypeOrmModule.forFeature([TicketEntity])],

  providers: [TicketService, ticketServiceProvider],
})
export class TicketModule {}
