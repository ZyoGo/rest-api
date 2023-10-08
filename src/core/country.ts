export interface Country {
  awsRegion?: string;
  capital?: string;
  code?: string;
  currencies?: string[];
  currency?: string;
  emoji?: string;
  emojiU?: string;
  languages?: Language[];
  name: string;
  native?: string;
  phone?: string;
  phones?: string[];
}

export interface Language {
  name: string;
}
