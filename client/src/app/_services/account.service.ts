import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUseerSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUseerSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user))
          this,this.currentUseerSource.next(user);
        }
      }) 
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUseerSource.next(user);
        }
      })
    )
  }
  
  setCurrentUser(user: User){
    this.currentUseerSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUseerSource.next(null);
  }
}
