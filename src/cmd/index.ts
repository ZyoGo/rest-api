import express, { Request, Response } from 'express';
import { AppConfig, Config } from '../config/config';
import * as dotenv from 'dotenv';
import  {TrevorBlades}  from '@driven/trevorBlade';
import { CountryService } from '@business/country';
import { ICountryRepository, ICountryService } from '@core/ICountry';
import { CountryController } from '@http/controller';

dotenv.config();

const config: Config = new Config();
const appConfig: AppConfig = config.getConfig();

const countryRepository: ICountryRepository = new TrevorBlades(
  appConfig.graphql_host
);
const countryService: ICountryService = new CountryService(countryRepository);
const countryController: CountryController = new CountryController(
  countryService
);

const app = express();
app.use('/', countryController.getRouter());
app.get('/health', (req: Request, res: Response) => {
  const healthStatus = {
    status: 'ok',
    message: 'Application is healthy'
  };

  res.status(200).json(healthStatus);
});

app.listen(appConfig.app_port, () => {
  console.log(`⚡️Server running on port ${appConfig.app_port}`);
});
