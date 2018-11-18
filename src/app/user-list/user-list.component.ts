import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/User.model';
import {Subscription} from 'rxjs';
import {UserService} from '../Service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscription: Subscription;


  constructor(private userServices: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userServices.userSubject.subscribe(
      (users: User[]) => {this.users = users; }
    );
    this.userServices.emitUsers();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
