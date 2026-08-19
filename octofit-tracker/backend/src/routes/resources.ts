import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter(resourceName: string, resourceModel: Model<unknown>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const records = await resourceModel.find({}).lean();

      response.json({ resource: resourceName, count: records.length, records });
    } catch (error) {
      next(error);
    }
  });

  return router;
}