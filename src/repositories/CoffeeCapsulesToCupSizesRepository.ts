import { EntityRepository, Repository } from 'typeorm';

import CoffeeCapsuleToCupSize from '../models/CoffeeCapsuleToCupSize';

@EntityRepository(CoffeeCapsuleToCupSize)
class CoffeeCapsulesToCupSizesRepository extends Repository<
  CoffeeCapsuleToCupSize
> {}

export default CoffeeCapsulesToCupSizesRepository;
