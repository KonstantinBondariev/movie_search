import { MovieInterface } from './movie-interface';

export interface OMDbAPIResponseInterface {
  Response: string;
  Search: MovieInterface[];
  totalResults: string;
}
