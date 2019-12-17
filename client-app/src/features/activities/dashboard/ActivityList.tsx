import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'
import ActivityListItem from './ActivityListItem'

interface IProps{

}
const ActivityList :React.FC<IProps> = () => {
const activityStore= useContext(ActivityStore);
console.log(activityStore.activitiesByDate);
    return (
        
        <Fragment>
         {activityStore.activitiesByDate.map(([group,activities])=>(
        <Fragment key ={group}>
         <Label key={group} size='large' color='blue'>{group}</Label>
        <Item.Group divided>
        {activities.map((activity)=>  <ActivityListItem key={activity.id} activity = {activity}></ActivityListItem>)} 
        </Item.Group>
    
      </Fragment>

          ))} 
             

       
             </Fragment>               
      
    )
}

export default observer(ActivityList);
