import { EntityRepository, Repository } from 'typeorm';
import { Devices } from './devices.entity';

@EntityRepository(Devices)
export class DevicesRepositry extends Repository<Devices> {}
