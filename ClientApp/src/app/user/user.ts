import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { UsersService } from '../../services/users.service';
import { UserManagement } from '../user-table/user-table.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit
{
  public userId: string;
  public title: string;

  constructor(private statusService: StatusService, private usersService: UsersService)
  {
    this.userId = '';
    this.title = '';
  }

  ngOnInit()
  {
    this.statusService.getStatus()
  }

  public addUser()
  {
    try
    {
      let user: UserManagement =
      {
        userId: this.userId,
        title: this.title
      }
      this.usersService.addUser(user);
    }
    catch (err)
    {
      console.error(err)
    }
  }

  public removeUser()
  {
    try
    {
      let user: UserManagement =
      {
        userId: this.userId,
        title: this.title
      }
      this.usersService.removeUser(user);
    }
    catch (err)
    {
      console.error(err)
    }
  }

}
