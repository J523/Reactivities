import React, { useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid'

interface IProps {
 setEditMode : (editMode:boolean)=> void,
 selectedActivity : IActivity,
 createActivity : (activity:IActivity) => void,
 editActivity : (activity:IActivity) => void

}
const ActivityForm : React.FC<IProps> = ({setEditMode ,selectedActivity,createActivity,editActivity}) => {

const initializeForm  = () => {

if(selectedActivity)
{
    return selectedActivity;
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

    const inputChangeHandler = (event :React.FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        //In case of even of type FormEvent use current target instead of target i.e. event.currentTarget
  const {name,value} = event.currentTarget;
        setActivity({...activity ,[name]:[value]});
    }

    const handlesubmit =(activity:IActivity) =>{

        if(activity.id !== ''){
        activity.id = uuid();
        createActivity(activity);
        }
        else{

        editActivity(activity);

        }

    }
    return (
       <Segment clearing>
           <Form>
               <Form.Input placeholder="Title" onChange={inputChangeHandler} name='title'  value={activity.title}></Form.Input>
               <Form.TextArea rows={2} placeholder="Description" onChange={inputChangeHandler} name='description'  value={activity.description}></Form.TextArea>
               <Form.Input placeholder="Category" onChange={inputChangeHandler} name='category'  value={activity.category}></Form.Input>
               <Form.Input type="datetime" placeholder="Date" onChange={inputChangeHandler} name='date'  value={activity.date}></Form.Input>
               <Form.Input placeholder="Venue" onChange={inputChangeHandler} name='venue'  value={activity.venue}></Form.Input>
               <Form.Input placeholder="City" onChange={inputChangeHandler} name='city'  value={activity.city}></Form.Input>
               <Button type="submit" floated='right' onClick={() =>handlesubmit(activity)} positive>Submit</Button>
               <Button floated='right' onClick={() => setEditMode(false)} >Cancel</Button>
           </Form>
       </Segment>
    )
}

export default ActivityForm;
