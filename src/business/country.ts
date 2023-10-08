import { ICountryRepository, ICountryService } from '@core/ICountry';
import { Country } from '@core/country';

export class CountryService implements ICountryService {
  private readonly countryRepository: ICountryRepository;

  constructor(countryRepository: ICountryRepository) {
    this.countryRepository = countryRepository;
  }

  async GetCountries(): Promise<Country[]> {
    try {
      return await this.countryRepository.GetCountries();
    } catch (error) {
      throw error;
    }
  }

  async GetCountryById(code: string): Promise<Country> {
    try {
      return await this.countryRepository.GetCountryById(code);
    } catch (error) {
      throw error;
    }
  }
}
