import { EntityRepository, Repository } from 'typeorm';

import CoffeeCapsule from '../models/CoffeeCapsule';

@EntityRepository(CoffeeCapsule)
class CoffeeCapsulesRepository extends Repository<CoffeeCapsule> {
  public async findByNameByMark(
    title: string,
    mark: string,
  ): Promise<CoffeeCapsule | null> {
    const findCoffeeSize = await this.findOne({
      where: { title, mark },
    });

    return findCoffeeSize || null;
  }
}

export default CoffeeCapsulesRepository;
