import React, { createRef, useEffect, useContext } from 'react'
import { Grid, Ref } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import ActivityStore from '../../../app/stores/activityStore'

const ActivityDashboard:React.FC= () => {
   
//make the store available to this component
const activityStore = useContext(ActivityStore);

useEffect(() => {
  //here our loadActivities function depends on the mobX activityStore so we have to give that as a dependency
  activityStore.loadActivities();

  },[activityStore]);
 
  if(activityStore.loadingIndicator) return <LoadingComponent content={"...loading"} />
    /*use the state of activities from the store*/


    return (
       
       <Grid>
          
           <Grid.Column width={10}>
           <ActivityList />
           </Grid.Column>
        
           
           <Grid.Column width={6} >
             
        <h2>Activity Filters</h2>
           </Grid.Column>                    
           
          
       </Grid>
      
    )
}

export default observer(ActivityDashboard);
