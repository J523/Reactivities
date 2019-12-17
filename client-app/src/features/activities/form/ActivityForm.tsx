import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'
import { RouteComponentProps } from 'react-router-dom'

interface DetailsParam {
    id:string
}

const ActivityForm : React.FC<RouteComponentProps<DetailsParam>> = ({match,history}) => {
    
const activityStore = useContext(ActivityStore);
const {loadActivity} =activityStore;

useEffect(() => {
    if(match.params.id){
        loadActivity(match.params.id)
        activityStore.activity && setActivity(activityStore.activity)
    }

    /*whenever we have to perform a cleanup in a useEffect function we do the
cleanup in a function which we have to return in the useEffect call. This is equivalent to calling the componentDidUnmount method
    */
   return () => {
        activityStore.clearActivity();

   }

},[loadActivity,match.params.id,activityStore.activity,activityStore.clearActivity,activityStore]);


    const [activity, setActivity] = useState<IActivity>({
        id:  '',
        title : '',
        description: '',
        category: '',
        date: '',
        city : '',
        venue: ''   
    });

    const inputChangeHandler = (event :React.FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        //In case of even of type FormEvent use current target instead of target i.e. event.currentTarget
  const {name,value} = event.currentTarget;
  
        setActivity({...activity ,[name]:value});
    }

    const handlesubmit =() =>{

        if(activity.id === ''){
        activity.id = uuid();
        console.log(activity);
        activityStore.createActivity(activity);
        history.push(`/activities/${activity.id}`);
        }
        else{

        console.log(activity);
        activityStore.editActivity(activity);
        history.push(`/activities/${activity.id}`);
        }

    }
    return (
        <Grid>
            <Grid.Column width={10}>
            <Segment clearing>
           <Form onSubmit={handlesubmit}> 
               <Form.Input placeholder="Title" onChange={inputChangeHandler} name='title'  value={activity.title}></Form.Input>
               <Form.TextArea rows={2} placeholder="Description" onChange={inputChangeHandler} name='description'  value={activity.description}></Form.TextArea>
               <Form.Input placeholder="Category" onChange={inputChangeHandler} name='category'  value={activity.category}></Form.Input>
               <Form.Input type="datetime-local" placeholder="Date" onChange={inputChangeHandler} name='date'  value={activity.date}></Form.Input>
               <Form.Input placeholder="Venue" onChange={inputChangeHandler} name='venue'  value={activity.venue}></Form.Input>
               <Form.Input placeholder="City" onChange={inputChangeHandler} name='city'  value={activity.city}></Form.Input>
               <Button loading={activityStore.submitting} type="submit" floated='right' positive>Submit</Button>
               <Button floated='right' onClick={() => history.push('/')} >Cancel</Button>
           </Form>
       </Segment>
            </Grid.Column>
        </Grid>
     
    )
}

export default observer(ActivityForm);
