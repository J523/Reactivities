import React, { createRef, useContext } from 'react'
import { Grid, Ref, Sticky } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'


const ActivityDashboard:React.FC= () => {
    const contextRef = createRef();
    const activityStore = useContext(ActivityStore);
    return (
       
       <Grid>
          
           <Grid.Column width={10}>
           <ActivityList />
           </Grid.Column>
           <Ref innerRef={contextRef}>
           
           <Grid.Column width={6} >
             
           <Sticky context={contextRef} offset={90}>
            {activityStore.selectedActivity&& !activityStore.editMode&& <ActivityDetails ></ActivityDetails>}
            {activityStore.editMode && <ActivityForm key={(activityStore.selectedActivity && activityStore.selectedActivity.id) || 0} />}
            </Sticky>
           </Grid.Column>                    
           </Ref>
          
       </Grid>
      
    )
}

export default observer(ActivityDashboard);
