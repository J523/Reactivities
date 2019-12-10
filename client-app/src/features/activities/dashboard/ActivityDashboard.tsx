import React, { createRef } from 'react'
import { Grid, Ref, Sticky } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {

    activities : IActivity[];
    selectActivity : (id:string)=> void;
    selectedActivity : IActivity;
    editMode : boolean;
    setEditMode : (editMode:boolean)=> void;
    setSelectedActivity : (activity: IActivity | null) => void;
    createActivity : (activity:IActivity) => void;
    editActivity : (activity:IActivity) => void;
    deleteActivity : (id:string,e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => void;
    submitting : boolean ;
    target:string;
}

const ActivityDashboard:React.FC<IProps> = ({activities,selectActivity,selectedActivity,editMode,setEditMode ,setSelectedActivity,editActivity,createActivity,deleteActivity,submitting,target}) => {
    const contextRef = createRef();
    return (
       
       <Grid>
          
           <Grid.Column width={10}>
       <ActivityList activities= {activities} selectActivity = {selectActivity} deleteActivity={deleteActivity} submitting ={submitting} target={target} />
           </Grid.Column>
           <Ref innerRef={contextRef}>
           
           <Grid.Column width={6} >
             
           <Sticky context={contextRef} offset={90}>
            {selectedActivity&& !editMode&& <ActivityDetails activity={selectedActivity} editMode ={editMode} setEditMode={setEditMode} setSelectedActivity ={setSelectedActivity}></ActivityDetails>}
            {editMode && <ActivityForm key={(selectedActivity && selectedActivity.id) || 0} editActivity ={editActivity} createActivity ={createActivity} setEditMode ={setEditMode} selectedActivity={selectedActivity} submitting ={submitting}/>}
            </Sticky>
           </Grid.Column>                    
           </Ref>
          
       </Grid>
      
    )
}

export default ActivityDashboard;
