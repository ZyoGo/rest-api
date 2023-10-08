export interface Country {
  awsRegion?: string;
  capital?: string;
  code?: string;
  currencies?: string[];
  currency?: string;
  emoji?: string;
  emojiU?: string;
  languages?: string[];
  name: string;
  native?: string;
  phone?: string;
  phones?: string[];
}

export interface GetCountries {
  data: {
    countries: Country[];
  };
}
