import { ICountryRepository } from '@core/ICountry';
import { Country } from '@core/country';
import axios, { AxiosResponse } from 'axios';

export class TrevorBlades implements ICountryRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async GetCountries(): Promise<Country[]> {
    try {
      const response: AxiosResponse = await axios.post(
        this.baseUrl,
        {
          query: `
            query {
                countries {
                name
                languages {
                    name
                    }
                }
            }
            `
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to fetch countries');
      }

      const countries: Country[] = response.data.data.countries;
      return countries;
    } catch (error: any) {
      throw new Error(`Failed to get countries : ${error.message}`);
    }
  }

  async GetCountryById(code: string): Promise<Country> {
    try {
      const response: AxiosResponse = await axios.post(
        this.baseUrl,
        {
          query: `
                query Country($code: ID!) {
                  country(code: $code) {
                    awsRegion
                    capital
                    code
                    currencies
                    currency
                    emoji
                    emojiU
                    name
                    native
                    phone
                    phones
                  }
                }
              `,
          variables: {
            code: code // Pass the 'code' variable as ID type
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to fetch country');
      }

      const country: Country = response.data.data.country;
      return country;
    } catch (error: any) {
      throw new Error(`Failed to get country: ${error.message}`);
    }
  }
}
