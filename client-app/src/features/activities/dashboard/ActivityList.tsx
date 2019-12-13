import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'

interface IProps{

}
const ActivityList :React.FC<IProps> = () => {
const activityStore= useContext(ActivityStore);

    return (
        <Segment clearing>
        <Item.Group divided>
        
         {activityStore.activitiesByDate.map((activity)=>( <Item key={activity.id}>
            <Item.Content verticalAlign='middle'>
          <Item.Header>{activity.title}</Item.Header>
         <Item.Meta>{activity.date}</Item.Meta>
         <Item.Description>
             <div>{activity.description}</div>
         <div>{activity.venue} , {activity.city}</div>
             </Item.Description>
            <Item.Extra>
         <Label as ='a' color='purple' tag>{activity.category}</Label>
         <Button name={activity.id} loading={activityStore.target===activity.id &&activityStore.submitting} floated='right' onClick= {(e)=> activityStore.deleteActivity(activity.id,e)} color ='red'>Delete</Button>
              <Button floated='right' color= "instagram" onClick={()=> activityStore.setselectedActivity(activity.id)}>View Activity</Button>
            </Item.Extra>
          </Item.Content>
        </Item>))} 
             

       
                          
      </Item.Group>
      </Segment>
    )
}

export default observer(ActivityList);
