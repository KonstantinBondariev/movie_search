import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  totalpages: number[] = [];
  currentDisplayPages!: number[];
  currentPage!: number;
  constructor(private mss: MovieSearchService) {}

  ngOnInit(): void {
    this.setTotalPages();
    this.currentPage = 1;
    this.setCurrentDisplayPages();
  }

  setCurrentDisplayPages(): void {
    this.currentPage <= 5
      ? (this.currentDisplayPages = this.totalpages.slice(0, 10))
      : this.currentPage < this.totalpages.length - 5
      ? (this.currentDisplayPages = this.totalpages.slice(
          this.currentPage - 5,
          this.currentPage + 5
        ))
      : this.currentPage - 4 <= this.totalpages.length &&
        this.currentPage <= this.totalpages.length
      ? (this.currentDisplayPages = this.totalpages.slice(-10))
      : null;
  }

  setTotalPages(): void {
    if (this.mss.totalResult) {
      for (let index = 0; index <= +this.mss.totalResult / 10; index++) {
        this.totalpages.push(index);
      }
    }
  }

  setCurrentPos(e: any) {
    if (e) {
      // !!!!!!!!!!potential danger!!!!!!!!!!!!!!!!
      this.currentPage = +e.target.innerText.trim();
      this.mss.curreantPage = e.target.innerText.trim();
    }
  }
}
