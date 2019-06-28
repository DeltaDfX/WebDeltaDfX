import { Component, OnInit } from '@angular/core';
import {BusinessUnit} from '../model/business-unit';
import {StakeholderService} from '../services/stakeholder.service';
import {GroupStakeholder} from '../model/group-stakeholder';
import {UserService} from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StakeholderFormComponent} from '../stakeholder-form/stakeholder-form.component';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import {ModalInfoComponent} from '../modal-info/modal-info.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  companies: BusinessUnit[] = [];
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  gender = '';
  company: BusinessUnit = null;
  password = '';
  passwordConfirm = '';
  isCheckPolicy = false;
  group: GroupStakeholder = null;
  groups: GroupStakeholder[];
  
  constructor(private stakeholderService: StakeholderService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.stakeholderService.getListBussinessUnits().subscribe( data => this.companies = data);
    this.stakeholderService.getGroupStakeholders().subscribe( data => this.groups = data);
  }

  submitSignup(event: any) {
    if (this.isCheckPolicy === false) {
      alert('Please confirm the policy');
      return;
    }
    if (this.password === '' || this.password !== this.passwordConfirm) {
      alert('The password is not match');
    };
    const data = {
      firstName: event.target.first_name.value,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      password: this.password,
      company: this.company,
      group: this.group
    };
    this.userService.createNewMember(data).subscribe( result => {
      if (result) {
        const modalRef = this.modalService.open(ModalInfoComponent, { centered: true });
        modalRef.componentInstance.title = `Hi! ${this.firstName} ${this.lastName}`;
        modalRef.componentInstance.message = 'Your account has been created. You can use the email to login now.';
      }
    });
    console.log(data);
  }

}
