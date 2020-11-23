import { Component, OnInit,Input,Output,EventEmitter  } from '@angular/core';
import { Activity } from '@app/_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-quadrant',
  templateUrl: './quadrant.component.html',
  styleUrls: ['./quadrant.component.scss']
})
export class QuadrantComponent implements OnInit {
  addActivityForm:FormGroup;
  @Input() activities: Activity[];
  @Input() title:string;
  @Input() activityType:number;
  @Output() deleteActivity: EventEmitter<number> = new EventEmitter<number>(); //creating an output event
  @Output() modifyActivity: EventEmitter<number> = new EventEmitter<number>(); //creating an output event
  @Output() addActivity:EventEmitter<Activity> = new EventEmitter<Activity>(); //creating an output event
  progress:number;
completed:Activity[]=[];
pending:Activity[]=[];
totalActivities:number;
  constructor(    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.totalActivities=this.activities.length||1;
    this.completed=  this.activities.filter(i=>i.isCompleted);
    this.pending=  this.activities.filter(i=>!i.isCompleted);
    
    this.progress=(this.completed.length*100)/this.totalActivities;
    this.progress.toFixed(2);
    this.addActivityForm = this.formBuilder.group({
      activityName: ['', Validators.required],
      activityType: [this.activityType]
  });
  }

  get f() { return this.addActivityForm.controls; }
  removeActivity(id:number){
    this.deleteActivity.emit(id);
  }
  updateActivity(id:number){
    this.modifyActivity.emit(id);
  }

  onSubmitHandler(){
    debugger;
    if (this.addActivityForm.invalid) {
      return;
  }
let activity:Activity=new Activity();
activity.activityType=this.f.activityType.value;
activity.activityName=this.f.activityName.value;
    this.addActivity.emit(activity);
  }
}
