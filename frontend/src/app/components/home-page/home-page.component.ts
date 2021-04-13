import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { URL  } from './url';


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value:any) {
      if (!value) return;

      return value.reverse();
    }
}

export interface DialogData {
  title: string;
  url: string;
  description : string;
}



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  title: string = '';
  url: string = '';
  description : string = '';
 

  urls:any = URL;
  constructor(public dialog: MatDialog, private service: ApiService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      height: '300px',
      data: {url: this.url, title: this.title, description : this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');


      if(result.title && result.url && result.description){
        this.service.add(result.title, result.url, result.description).subscribe((data)=>{
          console.log(data);
          window.location.reload();
        })
      }
    });
  }

  ngOnInit(): void {

    this.service.get().subscribe((data)=>{
      this.urls = data;

      console.log(this.urls);
    })
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  template: ` <div mat-dialog-content>
                
                <mat-form-field style="width:100%">
                  <mat-label>Title</mat-label>
                  <input matInput name="title" [(ngModel)]="data.title" required>
                </mat-form-field>

                <mat-form-field style="width:100%">
                  <mat-label>URL</mat-label>
                  <input matInput name="url" [(ngModel)]="data.url" required>
                </mat-form-field>

                <mat-form-field style="width:100%">
                  <mat-label> Description</mat-label>
                  <input matInput name="description" [(ngModel)]="data.description" required>
                </mat-form-field>
              </div>
              <p style="color:red">*youtube video links are not supported!!!</p>
              <div mat-dialog-actions>
                <button mat-button (click)="onClose()">No Thanks</button>
                <button color="primary" mat-button *ngIf="data.title && data.url && data.description" [mat-dialog-close]="data" cdkFocusInitial>Add</button>
              </div>`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onClose(): void {
    this.dialogRef.close();
  }

}
