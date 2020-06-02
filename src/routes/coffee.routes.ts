import { Router } from 'express';
import multer from 'multer';

import configUpload from '../config/upload';
import CreateCoffeeCupSizesService from '../services/CreateCoffeeCupSizesService';
import GetCoffeeCupSizesService from '../services/GetCoffeeCupSizesService';
import CreateCoffeeCapsulesService from '../services/CreateCoffeeCapsulesService';
import GetCoffeeCapsulesService from '../services/GetCoffeeCapsulesService';

const coffeeRouter = Router();
const upload = multer(configUpload('coffee'));

coffeeRouter.post(
  '/sizes',
  upload.single('image'),
  async (request, response) => {
    const { title } = request.body;
    const imageFilename = request.file.filename;
    const createCoffeeCupSizes = new CreateCoffeeCupSizesService();

    const coffeeSize = await createCoffeeCupSizes.execute({
      title,
      imageFilename,
    });

    response.json(coffeeSize);
  },
);

coffeeRouter.get('/sizes', async (request, response) => {
  const getCoffeeCupSizes = new GetCoffeeCupSizesService();
  const coffeeSizes = await getCoffeeCupSizes.execute();
  response.json(coffeeSizes);
});

coffeeRouter.post(
  '/capsules',
  upload.single('image'),
  async (request, response) => {
    const { title, mark, description, intensity, size } = request.body;
    let cupSizes = size.replace('[', '').replace(']', '').replace(/'/g, '');
    cupSizes = cupSizes.split(',');
    const imageFilename = request.file.filename;
    const createCoffeeCapsules = new CreateCoffeeCapsulesService();
    const coffeeCapsule = await createCoffeeCapsules.execute({
      title,
      mark,
      description,
      intensity,
      size: cupSizes,
      imageFilename,
    });

    response.json(coffeeCapsule);
  },
);

coffeeRouter.get('/capsules', async (request, response) => {
  const getCoffeeCapsulesService = new GetCoffeeCapsulesService();
  const coffeeCapsules = await getCoffeeCapsulesService.execute();
  response.json(coffeeCapsules);
});

export default coffeeRouter;
