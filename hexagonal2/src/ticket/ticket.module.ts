import { Module } from '@nestjs/common';
import { TicketController } from './adapter/api/ticket.controller';
import { TicketService } from './domain/ports/ticket.service';
import { TicketRepository } from './domain/ports/ticket.repository';
import { TicketDB } from './adapter/db/ticket-db.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './adapter/db/ticket.entity';
import { TicketInMemory } from './adapter/db/ticket-in-memory.repository';

@Module({
  controllers: [TicketController],
  imports: [TypeOrmModule.forFeature([TicketEntity])],

  providers: [
    TicketService,
    {
      provide: TicketRepository,
      useClass: 'mocked' === process.env.ENV ? TicketInMemory : TicketDB, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class TicketModule {}
