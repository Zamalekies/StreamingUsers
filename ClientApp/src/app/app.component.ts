import { Component, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  title = 'Streaming Counter';

  public status: string;

  public constructor(private statusService: StatusService) { this.status = ""; }

  public async ngOnInit()
  {
    this.statusService.data$.subscribe(result =>
    {
      this.status = result
    });
  }
}
