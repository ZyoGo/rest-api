import { ICountryRepository } from '../src/core/ICountry';
import { CountryService } from '../src/business/country';
import { Country } from '../src/core/country';


describe('CountryService', () => {
    let countryService: CountryService;
    let countryRepository: jest.Mocked<ICountryRepository>;
  
    beforeEach(() => {
      countryRepository = {
        GetCountries: jest.fn(),
        GetCountryById: jest.fn(),
      } as unknown as jest.Mocked<ICountryRepository>;
  
      countryService = new CountryService(countryRepository);
    });
  
    describe('GetCountries', () => {
      it('should success get countries from repository', async () => {
        const mockCountries: Country[] = [{ name: 'Indonesia', languages: [{name: "Bahasa Indonesia"}] }, { name: 'United Arab Emirates', languages: [{name: "Arabic"}] }];
        countryRepository.GetCountries.mockResolvedValue(mockCountries);
  
        const result = await countryService.GetCountries();
  
        expect(result).toEqual(mockCountries);
        expect(countryRepository.GetCountries).toHaveBeenCalledTimes(1);
      });
  
      it('should failed when get countries from the repository', async () => {
        countryRepository.GetCountries.mockRejectedValue(new Error('Failed to call graphql for get countries'));
  
        await expect(countryService.GetCountries()).rejects.toThrow('Failed to call graphql for get countries');
      });
    });
  
    describe('GetCountryById', () => {
      it('should success get country by code country from the repository', async () => {
        const mockCountry: Country = { 
            awsRegion: "ap-southeast-1",
            capital: "Jakarta",
            code: "ID",
            currencies: [
                "IDR"
            ],
            currency: "IDR",
            emoji: "🇮🇩",
            emojiU:"U+1F1EE U+1F1E9",
            name: "Indonesia",
            native: "Indonesia",
            phone: "62",
            phones: [
                "62"
            ]
        };
        countryRepository.GetCountryById.mockResolvedValue(mockCountry);
  
        const result = await countryService.GetCountryById('ID');
  
        expect(result).toEqual(mockCountry);
        expect(countryRepository.GetCountryById).toHaveBeenCalledWith('ID');
      });
  
      it('should failed get country error not found for country', async () => {
        countryRepository.GetCountryById.mockRejectedValue(new Error('Country Not Found'));
  
        await expect(countryService.GetCountryById('ID')).rejects.toThrow('Country Not Found');
      });
    });
  });