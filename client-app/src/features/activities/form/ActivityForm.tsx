import React, { useState, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'


const ActivityForm : React.FC = () => {
    
const activityStore = useContext(ActivityStore);

const initializeForm  = () => {
console.log(activityStore.selectedActivity);
if(activityStore.selectedActivity)
{
    return activityStore.selectedActivity;
}
else
{
    return {
        id:  '',
        title : '',
        description: '',
        category: '',
        date: '',
        city : '',
        venue: ''   
    };
}
}

    const [activity, setActivity] = useState<IActivity>(initializeForm);
console.log(activity);
    const inputChangeHandler = (event :React.FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        //In case of even of type FormEvent use current target instead of target i.e. event.currentTarget
  const {name,value} = event.currentTarget;
  
        setActivity({...activity ,[name]:value});
    }

    const handlesubmit =(activity:IActivity) =>{

        if(activity.id === ''){
        activity.id = uuid();
        console.log(activity);
        activityStore.createActivity(activity);
        }
        else{

        console.log(activity);
        activityStore.editActivity(activity);

        }

    }
    return (
       <Segment clearing>
           <Form>
               <Form.Input placeholder="Title" onChange={inputChangeHandler} name='title'  value={activity.title}></Form.Input>
               <Form.TextArea rows={2} placeholder="Description" onChange={inputChangeHandler} name='description'  value={activity.description}></Form.TextArea>
               <Form.Input placeholder="Category" onChange={inputChangeHandler} name='category'  value={activity.category}></Form.Input>
               <Form.Input type="datetime-local" placeholder="Date" onChange={inputChangeHandler} name='date'  value={activity.date}></Form.Input>
               <Form.Input placeholder="Venue" onChange={inputChangeHandler} name='venue'  value={activity.venue}></Form.Input>
               <Form.Input placeholder="City" onChange={inputChangeHandler} name='city'  value={activity.city}></Form.Input>
               <Button loading={activityStore.submitting} type="submit" floated='right' onClick={() =>handlesubmit(activity)} positive>Submit</Button>
               <Button floated='right' onClick={() => activityStore.setEditMode(false)} >Cancel</Button>
           </Form>
       </Segment>
    )
}

export default observer(ActivityForm);
