import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

export interface UserManagement
{
  userId: string;
  title: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit
{
  public displayedColumns: string[] = ['userId', 'title'];
  public dataSource: UserManagement[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit()
  {
    this.userService.data$.subscribe(result => this.dataSource = result)
  }

}
