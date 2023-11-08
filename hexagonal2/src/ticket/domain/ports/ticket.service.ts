import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Ticket } from '../model/ticket.model';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TicketRepository)
    private readonly tickerRepository: TicketRepository,
  ) {}

  async create(description: string, priority: number): Promise<Ticket> {
    const ticket = new Ticket(description, priority);
    // TODO: check count of tickets less than 3

    const count = await this.findActiveTickets();

    if (count.length >= 3) {
      throw new BadRequestException('Ticket count is more than 3');
    }
    this.tickerRepository.create(ticket);
    return ticket;
  }

  findAll(): Promise<Ticket[]> {
    return this.tickerRepository.findAll();
  }

  async findActiveTickets(): Promise<Ticket[]> {
    const activeTickets = await this.tickerRepository.findAll();
    console.log({ activeTickets });

    return activeTickets.filter((ticket) => !ticket.isClosed());
  }
}
