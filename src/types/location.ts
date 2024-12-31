export interface Region {
  id: string;
  name: string;
  countryId: string;
}

export interface Ciudad {
  id: string;
  name: string;
  regionId: string;
}

export interface Comuna {
  id: string;
  name: string;
  cityId: string;
}