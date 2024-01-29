import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public users!: User[];
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.toFormGroup();
  }

  toFormGroup(): void {
    this.userForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
    });
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  createUser(): void {
    if (this.userForm.valid) {
      console.log('click inside');
      const user: User = this.userForm.value;
      this.userService.createUser(user).subscribe(
        (createdUser: User) => {
          //Handle the response as needed
          console.log('User created successfully:', createdUser);
          this.getAllUsers();
        },
        (error) => {
          //Handle the error
          console.error('Error creating user:', error);
        }
      );
    }
  }

  deleteUser(userId: any): void {
    // Implement the logic to delete the user with the given userId
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        // Optionally, update the users array or fetch the updated list
        this.getAllUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
