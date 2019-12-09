import React from 'react'
import { IActivity } from '../../../app/models/activity'
import { Item, Button, Label, Segment } from 'semantic-ui-react'

interface IProps{
    activities: IActivity[];
    selectActivity : (id:string) => void;
    deleteActivity : (id:string) => void;
}
const ActivityList :React.FC<IProps> = ({activities ,selectActivity,deleteActivity}) => {
    return (
        <Segment clearing>
        <Item.Group divided>
        
         {activities.map((activity: IActivity)=>( <Item key={activity.id}>
            <Item.Content verticalAlign='middle'>
          <Item.Header>{activity.title}</Item.Header>
         <Item.Meta>{activity.date}</Item.Meta>
         <Item.Description>
             <div>{activity.description}</div>
         <div>{activity.venue} , {activity.city}</div>
             </Item.Description>
            <Item.Extra>
         <Label as ='a' color='purple' tag>{activity.category}</Label>
         <Button floated='right' onClick= {()=> deleteActivity(activity.id)} color ='red'>Delete</Button>
              <Button floated='right' color= "instagram" onClick={()=> selectActivity(activity.id)}>View Activity</Button>
            </Item.Extra>
          </Item.Content>
        </Item>))} 
             

       
                          
      </Item.Group>
      </Segment>
    )
}

export default ActivityList;
