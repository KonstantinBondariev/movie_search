import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { config } from 'rxjs';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { MovieFullDataInterface } from 'src/app/shared/types/movie-full-data-interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  id?: string;
  movie?: MovieFullDataInterface;
  constructor(private dialog: MatDialog, private mss: MovieSearchService) {}

  ngOnInit(): void {
    this.id = this.mss.cureantID;
    if (this.id) {
      this.mss
        .getfullData(this.id)
        .subscribe({ next: (res) => (this.movie = res) });
    }
  }

  clouseDialog() {
    setTimeout(() => this.dialog.closeAll(), 2000);
  }
}
