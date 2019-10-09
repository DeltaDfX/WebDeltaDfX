import {Component, Input, OnInit} from '@angular/core';
import {Stakeholder} from '../../model/stakeholder';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StakeholderService} from '../../services/stakeholder.service';
import {GroupStakeholder} from '../../model/group-stakeholder';
import {BusinessUnit} from '../../model/business-unit';

@Component({
  selector: 'app-stakeholder-form',
  templateUrl: './stakeholder-form.component.html',
  styleUrls: ['./stakeholder-form.component.scss']
})
export class StakeholderFormComponent implements OnInit {
  @Input() title;
  @Input() stakeholder: Stakeholder;
  @Input() isUpdate = true;
  @Input() businessUnit: BusinessUnit;

  stakeholderForm: FormGroup;
  name: string;
  isEdit = false;
  oldValue: Stakeholder;
  groupStakeholder: GroupStakeholder[] = [];

  constructor(private stakeholderService: StakeholderService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.stakeholderForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      radioGender: new FormControl()
    });
    if (this.stakeholder != null) {
      this.oldValue = Object.assign({}, this.stakeholder);
    } else {
      this.stakeholder = Object.create(null);
      this.isEdit = true;
    }

    this.stakeholderService.getGroupStakeholders().subscribe( data => {
      this.groupStakeholder = data;
    });
  }

  onSubmit() {
    this.isEdit = false;
    if (this.isUpdate) {
      this.stakeholderService.updateStakeholder(this.stakeholder).subscribe( (object: Stakeholder) => {
        if (object != null) {
          console.log(`Stakeholder ${object.id} is updated now.`);
        } else {
          alert(`Stakeholder ${object.id} is not updated now.`);
        }
        this.activeModal.close(object);
      });
    } else {
      this.stakeholder.businessUnit = this.businessUnit;
      this.stakeholderService.insertStakeholder(this.stakeholder).subscribe(object => {
        if (object) {
          console.log(`Stakeholder ${this.stakeholder.id} is inserted now.`);
        } else {
          alert('The stakeholder is not inserted to database');
        }
        this.activeModal.close(object);
      });
    }
  }

  changeValue() {
    if (this.isUpdate) {
      this.compareChangingData();
    }
  }

  compareChangingData() {
      this.isEdit = false;
      JSON.stringify(this.oldValue) === JSON.stringify(this.stakeholder) ? this.isEdit = false : this.isEdit = true;
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
