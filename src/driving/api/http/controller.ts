import express, { Request, Response, Router } from 'express';
import { ICountryService } from '@core/ICountry';
import { Country as countryResponse, GetCountries } from '@response/response';
import { Country as coreCountry } from '@core/country';

export class CountryController {
  private router: Router = express.Router();
  private countryService: ICountryService;

  constructor(countryService: ICountryService) {
    this.countryService = countryService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/countries', this.getCountries.bind(this));
    this.router.get('/country/:code', this.getCountryById.bind(this));
  }

  private async getCountries(req: Request, res: Response) {
    try {
      const countries: coreCountry[] = await this.countryService.GetCountries();

      const countriesForResponse: countryResponse[] = countries.map(
        (coreCountry) => ({
          ...coreCountry,
          languages:
            coreCountry.languages?.map((language) => language.name) || []
        })
      );

      const response: GetCountries = {
        data: {
          countries: countriesForResponse
        }
      };

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  private async getCountryById(req: Request, res: Response) {
    try {
      const { code } = req.params;
      const country: coreCountry = await this.countryService.GetCountryById(
        code.toUpperCase()
      );

      if (country) {
        res.status(200).json(country);
      } else {
        res.status(404).json({ error: 'Country not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public getRouter() {
    return this.router;
  }
}
