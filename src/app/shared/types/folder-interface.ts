import { CommentsDbResponseInterface } from './comments-DB-response-interface';

export interface FolderInterface {
  [imdbId: string]: CommentsDbResponseInterface;
}
