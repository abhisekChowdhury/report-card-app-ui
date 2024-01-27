import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}/user`);
    }

    public createUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiServerUrl}/user`, user);
    }

    /*
    public updateEmployee(user: User): Observable<User> {
      return this.http.put<User>(`${this.apiServerUrl}/user`, user);
    }

    public deleteEmployee(employeeId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/user${userId}`);
    }
    */
}
