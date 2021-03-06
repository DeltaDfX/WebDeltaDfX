import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  styleUrls: ['./modal-confirm.component.scss'],
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>{{message}}<span class="text-primary" [hidden]="effectingItem">"{{effectingItem}}"</span></strong></p>
      <p *ngIf="option == '' || option == null">All information associated to this user profile will be permanently saved.
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
    </div>
  `
})
export class ModalConfirmComponent implements OnInit {
  public message: string;
  public title: string;
  public option: string;
  public effectingItem: string;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}
