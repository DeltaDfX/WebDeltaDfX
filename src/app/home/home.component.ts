import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from '../register/register.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    register: RegisterComponent;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    loginOnClick() {
        this.router.navigate(['content']);
    }

    open() {
        const modalRef = this.modalService.open(RegisterComponent);
    }
}
