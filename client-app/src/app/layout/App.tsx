  import React ,{ useState, useEffect, Fragment} from 'react';
  import axios from 'axios';
  import {Container} from 'semantic-ui-react';
 import {IActivity} from '../models/activity'
import Navbar from '../../features/navigation/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
  const App = () => {


    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
    const [editMode, setEditMode] = useState(false);

    const selectActivityHandler = (id:string) => {

      setSelectedActivity(activities.filter(activity=> activity.id === id)[0]);
      setEditMode(false);
    }

    useEffect(() => {
      axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response)=>{
       
      let activities = response.data;
      activities.forEach((activity)=>{
        activity.date = activity.date.split('.')[0];
      })

        setActivities(activities);

        })
      },[]);
     
      const openForm = ()=> {
        setSelectedActivity(null);
        setEditMode(true);

      }

      const handleCreateActivity =(activity:IActivity)=>{

        setActivities([...activities,activity]);
        setEditMode(false);
        setSelectedActivity(activity);
      }
      const handleEditActivity =(activity:IActivity)=>{

        setActivities([...activities.filter(a=> a.id !== activity.id),activity]);
        setEditMode(false);
        setSelectedActivity(activity);
      }
      const deleteActivityHandler = (id:string) =>{
        setActivities([...activities.filter(a=> a.id !== id)]);
      }
    return (
      <Fragment>
        <Navbar openForm ={openForm}></Navbar>
      
        <Container style={{marginTop:"7em"}}>
          <ActivityDashboard activities={activities} selectActivity ={selectActivityHandler} selectedActivity={selectedActivity!} editMode={editMode} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} editActivity={handleEditActivity} createActivity ={handleCreateActivity}  deleteActivity ={deleteActivityHandler} />
          </Container>
        
      </Fragment>
  );
  }



  export default App;
