import {Component, ViewChild, OnInit, forwardRef} from '@angular/core';
import {ScheduleData} from '../../../models/schedule.model';
import {ScheduleService} from '../../../services/schedule.service'; // Import a service to fetch schedule data
import {CalendarOptions} from '@fullcalendar/core'; // useful for typechecking
import {DayGridView} from "@fullcalendar/daygrid/internal";

import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    @ViewChild('calendar') calendarComponent: any;


    scheduleData: ScheduleData[] = [

    ];

    constructor(private scheduleService: ScheduleService) {
    }

    ngOnInit() {
        this.scheduleService.getScheduleData().subscribe({
            next: data => {
                this.scheduleData = data
                this.calendarOptions.events = this.scheduleData.map(event => ({
                    title: event.courseTitle + "  " + event.lectureHall,
                    start: `${event.courseDate}T${event.courseTime}`,
                }));
            }
        });
    }

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridWeek',
        plugins: [dayGridPlugin],
        events: [],
        eventDidMount: function (info) {
            info.el.style.height = '70px';
           info.el.style.backgroundColor = '#e3e0e0'
           info.el.style.whiteSpace = 'initial'
           info.el.style.fontSize = '12px'
           info.el.style.color = '#000'
           info.el.style.lineHeight = '15px'
        },
        viewDidMount: function (info){
            info.el.style.border = '1px solid black';
            info.el.style.borderRadius = '10px';
        }

    };



}
