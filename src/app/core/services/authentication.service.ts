import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor() {
    this.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlMuQVJTSEFENjIzQEdNQUlMLkNPTSIsInVuaXF1ZV9uYW1lIjoiUy5BUlNIQUQ2MjNAR01BSUwuQ09NIiwiVXNlcklkIjoiMWYxMmM4MzUtZjE0OS00YTA5LWFiZmItNDE0YzA3MjYyZTYwIiwiQnJhbmNoSWQiOiIxIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1OTc4NTU5ODIsImV4cCI6MTU5Nzg1OTU4MiwiaWF0IjoxNTk3ODU1OTgyfQ.ukolFZeC3f5nb4yelkIGXaSjzan4y8CRlJ3-_uYHKVw';
   }
}
