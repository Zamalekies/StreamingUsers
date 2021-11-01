import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatusService
{
  public get data$() { return this._userData$.asObservable(); }

  private _userData$: ReplaySubject<string>;
  private baseURL: string = 'http://localhost:3000';
  private statusUrl: string = `${ this.baseURL }/health-check`;


  public constructor(private http: HttpClient) { this._userData$ = new ReplaySubject() }

  public async getStatus(): Promise<void>
  {
    try
    {
      this.http.get<res>(this.statusUrl).subscribe(async data =>
      {
        this._userData$.next("UP");
      });

    } catch (error)
    {
      this._userData$.next("DOWN");
    }
  }
}

export type res = { response: string; }
