import {Component, Input, OnInit, Output} from '@angular/core';
import {StakeholderService} from '../../../services/stakeholder.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
    fileData: File = null;
    data: FormData;
    messageAlert = '';

    constructor(private stakeholderService: StakeholderService) {
    }

    ngOnInit() {
    }

    fileProgress(fileInput) {
        this.fileData = fileInput.target.files[0];
        console.log(fileInput);
    }

    onSubmit() {
        const formdata = new FormData();
        formdata.append('file', this.fileData, this.fileData.name);
        this.stakeholderService.importfileStakeholder(formdata).subscribe( response => {
            this.messageAlert = response.message;
        });
    }
}
