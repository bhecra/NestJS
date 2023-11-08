import { TicketStatus } from 'src/ticket/domain/model/ticket.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text')
  description: string;

  @Column('text')
  status: TicketStatus;
}
