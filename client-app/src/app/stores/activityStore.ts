import {observable, action, computed ,configure, runInAction} from 'mobx'
import { IActivity } from '../models/activity'
import agent from '../api/agent';
import { createContext } from 'react';

//run mobX in strict mode
configure ({enforceActions: 'always'});

class ActivityStore{
  //making an observable map
  /*bservable maps are very useful if you don't want to react just to the change of a specific entry, but also to the addition or removal of entries. 
  Optionally takes an object, 
  entries array or string keyed ES6 map with initial values. */
@observable activityRegistry = new Map();

@observable activities :IActivity[] = [];
@observable loadingIndicator = false;
@observable selectedActivity :IActivity | undefined
@observable editMode = false;
@observable submitting = false;
@observable target ='';
//actions .when you want to make changes to the state

@computed get activitiesByDate(){

  return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date)- Date.parse(b.date));
}

@action loadActivities = () =>{
this.loadingIndicator =true;

    agent.Activities.list().then((activities)=>{
      runInAction('loading activities',()=>{ activities.forEach((activity)=>{
        activity.date = activity.date.split('.')[0];
        /**observable maps are stored in key value pairs . so if we want to access something from the map we do it by its key */
        this.activityRegistry.set(activity.id, activity);
      })});
       
        
      
       }).finally(
         
        ()=> runInAction('setting loading indicator',()=>{ this.loadingIndicator=false}))
}

@action setselectedActivity =(id:string)=>{
this.selectedActivity = this.activityRegistry.get(id);
this.editMode=false;
}

@action setEditMode =(isEdit:boolean)=>{
this.editMode = isEdit;
}

@action createActivity = (activity:IActivity)=>{
    this.submitting =true;

    

     agent.Activities.create(activity).then(()=>{
       //set for an observable map is like push in array

       runInAction('creating activities',()=>{  this.activityRegistry.set(activity.id,activity);
        this.editMode=false;
        this.selectedActivity = activity })
     
    }).finally(()=>    runInAction(()=>{this.submitting=false}) );


}

@action editActivity = (activity:IActivity) =>{
   this.submitting = true;
    agent.Activities.update(activity).then(()=>{

      runInAction('editing activities',()=>{
        this.activityRegistry.set(activity.id,activity);    
        this.editMode=false;
       this.selectedActivity = activity;

      })
      
     
    }).finally(()=> runInAction(()=>{this.submitting =false}) );


}
@action closeActivityDetails= ()=>{

  this.editMode=false;
  this.selectedActivity=undefined;
}

@action deleteActivity = (id:string,e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{

    this.target = e.currentTarget.name;
        this.submitting = true;
        agent.Activities.delete(id).then(()=>{

          runInAction('deleting activity',()=>{
            this.activityRegistry.delete(id);
            this.selectedActivity = undefined;
          })
        
        }).finally(()=> runInAction(()=>{this.submitting =false}) );
}

@action openForm = ()=>{

    this.selectedActivity = undefined; 
    
    this.editMode=true;
}

}

//we make the store available through the react's context since context is available to all the components
export default createContext(new ActivityStore());