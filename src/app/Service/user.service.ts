import {User} from '../models/User.model';
import {Subject} from 'rxjs';

export class UserService {
  private users: User[] = [
    {
      firstName: 'James',
      lastName: 'Smith',
      email: 'JamesSmith@baba.com',
      drinkPreference: 'Coca',
      hobbies: [
        'coder',
        'la degustation de café',
        'La danse'
      ]

    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
