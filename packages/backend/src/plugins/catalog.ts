import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { AzureDevOpsAnnotatorProcessor } from '@backstage/plugin-azure-devops-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  builder.addProcessor(AzureDevOpsAnnotatorProcessor.fromConfig(env.config));
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
