import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User ,ActivitiesDashboard,Activity} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ActivityService {
    constructor(private http: HttpClient) { }
    getAllActivities() {
        return this.http.post<ActivitiesDashboard>(`${environment.apiUrl}/Activity/getactivities`,{});
    }

    
    addActivity(activity: Activity) {
        return this.http.post(`${environment.apiUrl}/Activity/addactivity`, {ActivityType:activity.activityType,ActivityName:activity.activityName});
    }

    togglecompleteactivity(id: number) {
        return this.http.post(`${environment.apiUrl}/Activity/togglecompleteactivity`,{ActivityId:id});
    }

    deleteActivity(id: number) {
        return this.http.post(`${environment.apiUrl}/Activity/removeactivity`,{ActivityId:id});
    }
}