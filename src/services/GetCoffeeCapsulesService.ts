import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import CoffeeCapsule from '../models/CoffeeCapsule';

class CreateCoffeeCapsulesService {
  public async execute(): Promise<CoffeeCapsule[]> {
    const coffeeCapsulesRepository = getRepository(CoffeeCapsule);
    let coffeeCapsules = [];

    try {
      coffeeCapsules = await coffeeCapsulesRepository.find({
        relations: ['cupSizes'],
      });
      console.log('🧨🧨 coffeeCapsules::', coffeeCapsules);
    } catch (e) {
      console.log('ERROR:: LISTAR CAPSULAS E RELACIONAMENTO', e);
      throw new Error(e);
    }

    return coffeeCapsules;
  }
}

export default CreateCoffeeCapsulesService;
