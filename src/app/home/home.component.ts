import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User,ActivitiesDashboard, Activity } from '@app/_models';
import { ActivityService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',styleUrls:['home.component.scss'] })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    activities:ActivitiesDashboard;
    loading:boolean=true
    

    constructor(
        private authenticationService: AuthenticationService,
        private activityService: ActivityService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
         this.loadAllActivities();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    addActivity(activity:Activity){
        debugger;
    this.loading=true;
        this.activityService.addActivity(activity).pipe(first()).subscribe(() => {
            this.loadAllActivities()
        });
    }
    deleteActivity(id: number) {
        this.loading=true;
        this.activityService.deleteActivity(id).pipe(first()).subscribe(() => {
            this.loadAllActivities()
        });
    }
    modifyActivity(id: number) {
        this.loading=true;
        this.activityService.togglecompleteactivity(id).pipe(first()).subscribe(() => {
            
            this.loadAllActivities()
        });
    }
    private loadAllActivities() {
        this.activityService.getAllActivities().pipe(first()).subscribe(actvities => {
            this.activities = actvities;
            this.loading=false;
        });
    }
}