import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendApiService} from '../../services/backend-api.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {

  userEditFormGroup: FormGroup = new FormGroup({
    user_firstname: new FormControl('', Validators.required),
    user_lastname: new FormControl('', Validators.required),
    user_email: new FormControl('', Validators.required),
    user_phone: new FormControl(''),
    user_password: new FormControl('', Validators.required)
  });
  userID: any;
  userImage: File;
  userImageUrl: string;
  userRepeatPassword: FormControl = new FormControl('');
  infoMessage: string = '';
  status: string;
  displayInfoMessage: boolean = false;
  sending: boolean = false;

  constructor(private apiService: BackendApiService) { }

  ngOnInit() {
    this.checkUserStatus();
  }

  public submitChanges(){
    this.sending = true;
    let formData = {
      user_firstname: this.userEditFormGroup.get('user_firstname').value,
      user_lastname: this.userEditFormGroup.get('user_lastname').value,
      user_email: this.userEditFormGroup.get('user_email').value,
      user_phone: this.userEditFormGroup.get('user_phone').value,
      user_password: this.userEditFormGroup.get('user_password').value,
    };
    if(this.userID){
      formData['id'] = this.userID;
    }
    this.apiService.submitChanges(formData)
      .subscribe( response => {
        if(response.status === 200){
          this.displayInfo("Changes have been saved", 'success');
        }else{
          this.displayInfo("Something went wrong :/", 'fail');
        }
      });
    if(this.userImage){
      this.uploadImage();
    }
  }

  public checkUserStatus(){
    this.apiService.checkUserStatus()
      .map(res => res.json())
      .subscribe( userList => {
        const user = userList[0];
        this.userID = user.id ? user.id : null;
        this.userEditFormGroup.get('user_firstname').setValue(user['user_firstname']);
        this.userEditFormGroup.get('user_lastname').setValue(user['user_lastname']);
        this.userEditFormGroup.get('user_email').setValue(user['user_email']);
        this.userEditFormGroup.get('user_phone').setValue(user['user_phone']);
        if(user.user_avatar){
          this.userImageUrl = this.apiService.baseUrl + '/storage/avatars/'+ this.userID +'.jpg';
        }
      });
  }


  public onFileChanged(event: any){
    this.userImage = event.target.files[0];
    if(event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (event:any) => {
        this.userImageUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private uploadImage(){
    this.apiService.uploadImage(this.userImage, this.userID);
  }

  private displayInfo(message: string, status: string){
    this.infoMessage = message;
    this.displayInfoMessage = true;
    this.status = status;
    this.sending = false;
  }

}
