import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor() {
    this.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlMuQVJTSEFENjIzQEdNQUlMLkNPTSIsInVuaXF1ZV9uYW1lIjoiUy5BUlNIQUQ2MjNAR01BSUwuQ09NIiwiVXNlcklkIjoiMWYxMmM4MzUtZjE0OS00YTA5LWFiZmItNDE0YzA3MjYyZTYwIiwiQnJhbmNoSWQiOiIxIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1OTc3Nzg0MjYsImV4cCI6MTU5Nzc4MjAyNiwiaWF0IjoxNTk3Nzc4NDI2fQ.y-IYoirBEd482V-VxjFjSkFpZMh6cDfjRyxczd4VtbY';
   }
}
