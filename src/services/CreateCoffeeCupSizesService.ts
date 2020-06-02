import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import configUpload from '../config/upload';

import CoffeeCupSizesRepository from '../repositories/CoffeeCupSizesRepository';
import CoffeeCupSize from '../models/CoffeeCupSize';

interface Request {
  title: string;
  imageFilename: string;
}

class CreateCoffeeCupSizesService {
  public async execute({
    title,
    imageFilename,
  }: Request): Promise<CoffeeCupSize> {
    const coffeeSizesRepository = getCustomRepository(CoffeeCupSizesRepository);
    let coffeeSize = await coffeeSizesRepository.findByName(title);

    if (coffeeSize && coffeeSize.image) {
      const uploadConfig = configUpload('coffee');
      const imageCoffeeSizePath = path.join(
        uploadConfig.directory,
        coffeeSize.image,
      );
      const imageCoffeeSizeFileExists = await fs.promises.stat(
        imageCoffeeSizePath,
      );

      if (imageCoffeeSizeFileExists) {
        await fs.promises.unlink(imageCoffeeSizePath);
      }

      coffeeSize.image = imageFilename;
    }

    if (!coffeeSize) {
      coffeeSize = coffeeSizesRepository.create({
        title,
        image: imageFilename,
      });
    }

    await coffeeSizesRepository.save(coffeeSize);

    return coffeeSize;
  }
}

export default CreateCoffeeCupSizesService;
