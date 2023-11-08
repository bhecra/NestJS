import { Ticket } from '../model/ticket.model';

export interface TicketRepository {
  create(ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
}

export const TicketRepository = Symbol('TicketRepository');
