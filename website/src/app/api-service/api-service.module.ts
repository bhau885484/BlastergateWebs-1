import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { EscapeHtmlPipe } from './service/pipes/keep-html.pipe';
import { Time24to12Format } from './service/pipes/time24to12.pipe';
import { RouterModule } from '@angular/router';
import { RangePipe } from './service/pipes/range.pipe';  // Import the custom pipe
import { TimeFormatPipe } from './service/pipes/time-format.pipe'; // Adjust the path as needed


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ToastrModule.forRoot(),
       
    ],
    declarations: [
        EscapeHtmlPipe,
        Time24to12Format,
        RangePipe,
        TimeFormatPipe
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        EscapeHtmlPipe,
        Time24to12Format,
        RangePipe,
        TimeFormatPipe
       
    ],
    providers: [
        
    ]
})
export class SharedModule { }