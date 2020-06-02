import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import CoffeeCupSizesRepository from '../repositories/CoffeeCupSizesRepository';
import CoffeeCapsulesRepository from '../repositories/CoffeeCapsulesRepository';
import CoffeeCupSize from '../models/CoffeeCupSize';
import CoffeeCapsule from '../models/CoffeeCapsule';
import CoffeeCapsuleToCupSize from '../models/CoffeeCapsuleToCupSize';

interface Request {
  title: string;
  mark: string;
  description: string;
  intensity: number;
  size: string[];
  imageFilename: string;
}

class CreateCoffeeCapsulesService {
  public async execute({
    title,
    mark,
    description,
    intensity,
    size,
    imageFilename,
  }: Request): Promise<CoffeeCapsule> {
    if (!mark) {
      throw new AppError('Mark is required');
    }

    const coffeeCapsulesRepository = getCustomRepository(
      CoffeeCapsulesRepository,
    );
    const coffeeCupSizesRepository = getCustomRepository(
      CoffeeCupSizesRepository,
    );
    const coffeeCapsulesToCupSizesRepository = getRepository(
      CoffeeCapsuleToCupSize,
    );

    let coffeeCapsule = await coffeeCapsulesRepository.findByNameByMark(
      title,
      mark,
    );

    if (coffeeCapsule) {
      throw new AppError('This capsule in this mark already exists');
    }

    const coffeeCupSizes: CoffeeCupSize[] = [];

    if (size) {
      size.forEach(async cupSizeTitle => {
        const coffeeCupSize = await coffeeCupSizesRepository.findByName(
          cupSizeTitle,
        );
        if (!coffeeCupSize) {
          throw new AppError(`Cup size "${cupSizeTitle}" does not exists`);
        }
        coffeeCupSizes.push(coffeeCupSize);
      });
    }

    if (!coffeeCapsule) {
      coffeeCapsule = coffeeCapsulesRepository.create({
        title,
        mark,
        description,
        intensity,
        image: imageFilename,
      });
      const coffeeCapsulesToCupSizes = coffeeCapsulesToCupSizesRepository.create(
        coffeeCupSizes.map(cupSize => ({
          coffeeCapsuleId: coffeeCapsule?.id,
          coffeeCupSizeId: cupSize.id,
        })),
      );
      await coffeeCapsulesToCupSizesRepository.save(coffeeCapsulesToCupSizes);
      coffeeCapsule.cupSizes = coffeeCupSizes;
      await coffeeCapsulesRepository.save(coffeeCapsule);
    }

    return coffeeCapsule;
  }
}

export default CreateCoffeeCapsulesService;
