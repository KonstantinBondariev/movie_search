import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public massage!: string;
  public userPas: string = 'admin';
  public userLogin: string = 'admin';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.setMassage();
  }
  private setMassage(msg: string = ''): void {
    if (msg) {
      this.massage = msg;
      return;
    }
    this.massage = `Logged${this.authService.isLoggedIn ? 'In' : 'Out'}`;
  }

  logIn(): void {
    this.setMassage('trying login');
    this.authService.logIn(this.userLogin, this.userPas).subscribe({
      next: (res) => {
        this.setMassage();
        if (!this.authService.isLoggedIn) return;
      },
      error: (err) => console.error(err),
    });
  }

  logOut(): void {
    this.authService.logOut();
    this.setMassage();
  }
}
