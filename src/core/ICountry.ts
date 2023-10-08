import { Country } from '@core/country';

export interface ICountryRepository {
  GetCountries(): Promise<Country[]>;
  GetCountryById(code: string): Promise<Country>;
}

export interface ICountryService {
  GetCountries(): Promise<Country[]>;
  GetCountryById(code: string): Promise<Country>;
}
