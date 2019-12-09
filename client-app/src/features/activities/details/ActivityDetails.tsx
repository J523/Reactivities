import React from 'react'
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps{
    activity : IActivity,
    editMode : boolean,
    setEditMode : (editMode:boolean)=> void,
    setSelectedActivity : (activity: IActivity | null) => void
}

const ActivityDetails: React.FC<IProps> = ({activity,setEditMode}) => {

    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.venue} , {activity.city}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick= {() => setEditMode(true)} basic color='blue'>Edit</Button>
            <Button basic color='grey'>Cancel</Button>
        </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

export default ActivityDetails;
