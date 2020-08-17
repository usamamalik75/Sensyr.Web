import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor() {
    this.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlMuQVJTSEFENjIzQEdNQUlMLkNPTSIsInVuaXF1ZV9uYW1lIjoiUy5BUlNIQUQ2MjNAR01BSUwuQ09NIiwiVXNlcklkIjoiMWYxMmM4MzUtZjE0OS00YTA5LWFiZmItNDE0YzA3MjYyZTYwIiwiQnJhbmNoSWQiOiIxIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1OTc2OTEwNjAsImV4cCI6MTU5NzY5NDY2MCwiaWF0IjoxNTk3NjkxMDYwfQ.Y4ZnC4Ynp6iIJJMrX_VQY723d8U1ulFBEQK-YRZPz9I';
   }
}
