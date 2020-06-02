import { EntityRepository, Repository } from 'typeorm';

import CoffeeCupSize from '../models/CoffeeCupSize';

@EntityRepository(CoffeeCupSize)
class CoffeeCupSizesRepository extends Repository<CoffeeCupSize> {
  public async findByName(title: string): Promise<CoffeeCupSize | null> {
    const findCoffeeSize = await this.findOne({
      where: { title },
    });

    return findCoffeeSize || null;
  }
}

export default CoffeeCupSizesRepository;
