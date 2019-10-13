import {Component, Input, OnInit} from '@angular/core';
import {Stakeholder} from '../../model/stakeholder';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StakeholderService} from '../../services/stakeholder.service';
import {GroupStakeholder} from '../../model/group-stakeholder';
import {BusinessUnit} from '../../model/business-unit';
import {isDeepStrictEqual} from 'util';
import {deepEqual, notDeepStrictEqual} from 'assert';
import {UserService} from '../../services/user.service';
import {GroupType} from '../../main-pages/data-management/survey/send-survey/send-survey.component';

@Component({
  selector: 'app-stakeholder-form',
  templateUrl: './stakeholder-form.component.html',
  styleUrls: ['./stakeholder-form.component.scss']
})
export class StakeholderFormComponent implements OnInit {
  @Input() title;
  @Input() stakeholder: Stakeholder;
  isUpdate = false;
  @Input() businessUnit: BusinessUnit;
  @Input() groupType;

  stakeholderForm: FormGroup;
  name: string;
  isEdit = false;
  oldValue: Stakeholder;
  groupStakeholder: GroupStakeholder[] = [];

  constructor(private stakeholderService: StakeholderService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.stakeholderService.getGroupStakeholders().subscribe(data => {
      this.groupStakeholder = data;
      if (this.isUpdate) {
        const selectionGroup = this.stakeholderForm.controls['groupStakeholderForm'] as FormGroup;
        const currentGroup = this.groupStakeholder[this.groupStakeholder.findIndex(group => group.id === this.stakeholder.group.id)];
        // console.log(selectionGroup.controls['groupSelection'].value);
        selectionGroup.controls['groupSelection'].patchValue(currentGroup);
        this.isEdit = false;
      } else {
        const selectionGroup = this.stakeholderForm.controls['groupStakeholderForm'] as FormGroup;
        const currentGroup = this.groupStakeholder[this.groupStakeholder.findIndex(group => group.name === GroupType[this.groupType])];
        selectionGroup.controls['groupSelection'].patchValue(currentGroup);
      }
    });
    if (this.stakeholder != null) {
      this.stakeholderForm = this.formBuilder.group({
        name: [this.stakeholder.name],
        email: [this.stakeholder.email, Validators.email],
        phone: [this.stakeholder.phone, Validators.pattern('(\\+[0-9]{1,3})?[0-9]{8,10}$')],
        radioGender: [this.stakeholder.gender],
        groupStakeholderForm: this.formBuilder.group({
          groupSelection: [null]
        })
      });
      this.oldValue = Object.assign({}, this.stakeholder);
      this.isUpdate = true;
    } else {
      this.stakeholderForm = this.formBuilder.group({
        name: [''],
        email: ['', Validators.email],
        phone: ['', Validators.pattern('(\\+[0-9]{1,3})?[0-9]{8,10}$')],
        radioGender: [''],
        groupStakeholderForm: this.formBuilder.group({
          groupSelection: [null]
        })
      });
      this.stakeholder = Object.create(null);
      this.isEdit = true;
    }
  }

  onSubmit() {
    this.isEdit = false;
    if (this.isUpdate) {
      this.stakeholderService.updateStakeholder(this.stakeholder).subscribe((object: Stakeholder) => {
        if (object != null) {
          console.log(`Stakeholder ${object.id} is updated now.`);
        } else {
          alert(`Stakeholder ${object.id} is not updated now.`);
        }
        this.activeModal.close(object);
      });
    } else {
      // Add new stakeholder to the business unit of sender
      const sender: Stakeholder = this.userService.getUserInfo();
      this.stakeholder.businessUnit = sender.businessUnit;
      this.stakeholderService.insertStakeholder(this.stakeholder).subscribe((object: Stakeholder) => {
        if (object) {
          object.isSelected = true;
          console.log(`Stakeholder ${this.stakeholder.id} is inserted now.`);
          this.activeModal.close(object);
        } else {
          alert('The stakeholder is not inserted to database');
        }
      });
    }
  }

  compareChangingData(changingValue) {
    if (this.isUpdate) {
      if (this.stakeholder.group.id !== this.oldValue.group.id || this.stakeholder.gender !== this.oldValue.gender
        || this.stakeholder.phone !== this.oldValue.phone || this.stakeholder.email !== this.oldValue.email
        || this.stakeholder.name !== this.oldValue.name) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (this.isUpdate === true) {
      return o1.id === o2.id && o1.name === o2.name;
    } else {
      return o1;
    }
  }

  dismissModal() {
    console.log(this.oldValue);
    this.activeModal.close(this.oldValue);
  }
}
