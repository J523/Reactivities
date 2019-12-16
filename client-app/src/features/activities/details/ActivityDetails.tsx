import React, { useContext, useEffect } from 'react'
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import {RouteComponentProps, Link} from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
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
        <Card fluid>
        <Image src={`/assets/categoryImages/${activityStore.activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{activityStore.activity!.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activityStore.activity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {activityStore.activity!.venue} , {activityStore.activity!.city}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button as={Link} to={`/manage/${activityStore.activity.id}`} basic color='blue'>Edit</Button>
            <Button onClick={activityStore.closeActivityDetails} basic color='grey'>Cancel</Button>
        </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
