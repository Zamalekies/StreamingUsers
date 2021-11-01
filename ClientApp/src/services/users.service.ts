import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserManagement } from '../app/user-table/user-table.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService
{
  public get data$() { return this._userData$.asObservable(); }

  private _userData$: ReplaySubject<UserManagement[]>;
  private baseURL: string = 'http://localhost:3000';
  private addUrl: string = `${ this.baseURL }/add`;
  private removeUrl: string = `${ this.baseURL }/remove`;
  private activeUrl: string = `${ this.baseURL }/active`;


  public constructor(private http: HttpClient) { this._userData$ = new ReplaySubject() }

  public async addUser(user: UserManagement): Promise<void>
  {
    try
    {
      this.http.post(this.addUrl, user).subscribe();
    }
    catch (error)
    {
      console.error(error);
    }
    this.refreshList(user);
  }

  public async removeUser(user: UserManagement): Promise<void>
  {
    try
    {
      this.http.post(this.removeUrl, user).subscribe();
    }
    catch (error)
    {
      console.error(error);
    }
    this.refreshList(user);
  }

  public async refreshList(user: UserManagement): Promise<void>
  {
    try
    {
      this.http.post<streams>(this.activeUrl, user).subscribe(async data =>
      {
        let streams: UserManagement[] = [];

        data.activeStreams.forEach(title =>
        {
          streams.push
            ({
              userId: user.userId,
              title: title
            });
        });
        this._userData$.next(streams);
      });

    } catch (error)
    {
      console.error(error);
    }
  }
}

export type streams = { activeStreams: string[]; }
