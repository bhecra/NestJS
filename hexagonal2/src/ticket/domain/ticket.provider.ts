import { TicketDB } from '../adapter/db/ticket-db.repository';
import { TicketInMemory } from '../adapter/db/ticket-in-memory.repository';
import { TicketRepository } from './ports/ticket.repository';

enum EnvironmentEnum {
  Mocked = 'mocked',
  Local = 'local',
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

export const providerFactory = (providers: Record<string, any>): any => {
  const currentEnv = process.env.ENV;
  const providerKey =
    Object.keys(providers).find((key) => key === currentEnv) ||
    EnvironmentEnum.Development;
  const provider = providers[providerKey];

  return provider;
};

export const ticketRepository: TicketRepository = providerFactory({
  [EnvironmentEnum.Production]: TicketDB,
  [EnvironmentEnum.Test]: TicketDB,
  [EnvironmentEnum.Development]: TicketDB,
  [EnvironmentEnum.Local]: TicketDB,
  [EnvironmentEnum.Mocked]: TicketInMemory,
});
