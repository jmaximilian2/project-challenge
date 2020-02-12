export interface SearchRequest {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  districts: [string];
  maxPrice: number;
  minSize: number;
  mailAddress: string;
  phoneNumber: string;
  comment: string;
}
