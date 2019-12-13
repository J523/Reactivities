import React, { useContext } from 'react'
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
interface IProps{  
   
}

const ActivityDetails: React.FC<IProps> = () => {
  const activityStore = useContext(ActivityStore);

    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activityStore.selectedActivity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{activityStore.selectedActivity!.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activityStore.selectedActivity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {activityStore.selectedActivity!.venue} , {activityStore.selectedActivity!.city}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick= {() => activityStore.setEditMode(true)} basic color='blue'>Edit</Button>
            <Button onClick={activityStore.closeActivityDetails} basic color='grey'>Cancel</Button>
        </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
