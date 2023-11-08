import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/domain/model/ticket.model';
import { TicketRepository } from 'src/ticket/domain/ports/ticket.repository';
import { DataSource, Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { CreateTicketDto } from '../api/create-ticket.dto';

@Injectable()
export class TicketDB implements TicketRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(TicketEntity)
    private readonly productRepository: Repository<TicketEntity>,
    private readonly dataSource: DataSource,
  ) {}
  private readonly tickets: Ticket[] = [];

  async create(ticket: Ticket): Promise<Ticket> {
    console.log('TicketDB:', { ticket });

    const ticketCommand: CreateTicketDto = {
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
    };

    const newticket = this.productRepository.create(ticketCommand);
    // const newticket = this.productRepository.create(ticketCommand);
    await this.productRepository.save(newticket);

    return ticket;
    //return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    const ticketentity = await this.productRepository.find();

    return ticketentity.map((ticket) => {
      const newTicket: Ticket = new Ticket(ticket.description, 1);
      newTicket.status = ticket.status;

      return newTicket;
    });
  }
}
