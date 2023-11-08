import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { TicketService } from 'src/ticket/domain/ports/ticket.service';

import { CreateTicketDto } from './create-ticket.dto';

@Controller({
  path: 'tickets',
  version: ['1'],
})
export class TicketController {
  private readonly logger = new Logger(TicketController.name);

  constructor(private ticketService: TicketService) {}

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Post()
  create(@Body() tickeCommand: CreateTicketDto) {
    const ticker = this.ticketService.create(
      tickeCommand.description,
      tickeCommand.priority,
    );
    this.logger.debug(tickeCommand);
    this.logger.debug({ ticker });
    return ticker;
  }
}
