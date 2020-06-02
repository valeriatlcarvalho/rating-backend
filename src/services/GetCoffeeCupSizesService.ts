import { getRepository } from 'typeorm';

import CoffeeCupSize from '../models/CoffeeCupSize';

class GetCoffeeCupSizesService {
  public async execute(): Promise<CoffeeCupSize[]> {
    const coffeeSizesRepository = getRepository(CoffeeCupSize);
    const coffeeSizes = await coffeeSizesRepository.find();

    return coffeeSizes;
  }
}

export default GetCoffeeCupSizesService;
