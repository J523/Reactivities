import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import {RouteComponentProps} from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'
interface RouteParams{  
   id:string
}

const ActivityDetails: React.FC<RouteComponentProps<RouteParams>> = ({match}) => {

  const activityStore = useContext(ActivityStore);
  
   useEffect(() => {
  activityStore.loadActivity(match.params.id) ;
},[activityStore.loadActivity,match.params.id,activityStore]);
  
  if(activityStore.loadingIndicator || !activityStore.activity)
 return <LoadingComponent>Loading activities...</LoadingComponent>

    return (
        <Grid>
          <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activityStore.activity}/>
            <ActivityDetailedInfo activity={activityStore.activity}/>
            <ActivityDetailedChat/>
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetailedSideBar/>
          </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
