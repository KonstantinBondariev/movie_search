import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  totalpages: any[] = [];
  currentDisplayPages!: any[];
  currentPage!: number;
  constructor(private mss: MovieSearchService) {}

  ngOnInit(): void {
    this.setTotalPages();
    this.currentPage = 1;
    this.setCurrentDisplayPages();
  }

  setCurrentDisplayPages(): void {
    this.currentPage <= 5
      ? (this.currentDisplayPages = this.totalpages.slice(0, 11))
      : this.currentPage < this.totalpages.length - 5
      ? (this.currentDisplayPages = this.totalpages.slice(
          this.currentPage - 5,
          this.currentPage + 5
        ))
      : null;
  }

  changeCurrentDisplayPages(): void {}

  setTotalPages(): void {
    // *ngFor loop number
    if (this.mss.totalResult) {
      for (let index = 0; index < +this.mss.totalResult; index++) {
        this.totalpages.push(index);
      }
    }
  }

  setCurrentPos(e: any) {
    if (e) {
      this.currentPage = +e.target.innerText;
      console.log('current page', this.currentPage);

      this.mss.curreantPage = e.target.innerText;
    }
  }
}
