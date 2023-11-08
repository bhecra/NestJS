import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  description: string;
  priority: number;
  status: any;
}
