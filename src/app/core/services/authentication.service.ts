import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor() {
    this.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlMuQVJTSEFENjIzQEdNQUlMLkNPTSIsInVuaXF1ZV9uYW1lIjoiUy5BUlNIQUQ2MjNAR01BSUwuQ09NIiwiVXNlcklkIjoiMWYxMmM4MzUtZjE0OS00YTA5LWFiZmItNDE0YzA3MjYyZTYwIiwiQnJhbmNoSWQiOiIxIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1OTc2MDk0NzksImV4cCI6MTU5NzYxMzA3OSwiaWF0IjoxNTk3NjA5NDc5fQ.mpRopnleCZerWgb88-A0WPPetWtStxZ_HYnX3LGfAok';
   }
}
