import { Injectable } from '@nestjs/common';
import { Ticket } from 'src/ticket/domain/model/ticket.model';
import { TicketRepository } from 'src/ticket/domain/ports/ticket.repository';

@Injectable()
export class TicketInMemory implements TicketRepository {
  private readonly tickets: Ticket[] = [];

  async create(ticket: Ticket): Promise<Ticket> {
    this.tickets.push(ticket);
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.tickets;
  }
}
