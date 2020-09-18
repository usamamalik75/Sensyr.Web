import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor(
    private router: Router
  ) {
    // this.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlMuQVJTSEFENjIzQEdNQUlMLkNPTSIsInVuaXF1ZV9uYW1lIjoiUy5BUlNIQUQ2MjNAR01BSUwuQ09NIiwiVXNlcklkIjoiMWYxMmM4MzUtZjE0OS00YTA5LWFiZmItNDE0YzA3MjYyZTYwIiwiQnJhbmNoSWQiOiIxIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1OTc4NjY3OTQsImV4cCI6MTU5Nzg3MDM5NCwiaWF0IjoxNTk3ODY2Nzk0fQ.r1l5Gp1RRNDi0Htta3XB7Ewyul0HYFwjmpPLaTNEfpw';
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  loginNavigate() {
    this.router.navigate(['auth', 'login']);

  }
}
