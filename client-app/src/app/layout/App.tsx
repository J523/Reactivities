  import React ,{ useState, useEffect, Fragment} from 'react';
  import {Container} from 'semantic-ui-react';
 import {IActivity} from '../models/activity'
import Navbar from '../../features/navigation/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent';
  const App = () => {


    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setsubmitting] = useState(false);
    const [target, setTarget] = useState<string>('');

    const selectActivityHandler = (id:string) => {

      setSelectedActivity(activities.filter(activity=> activity.id === id)[0]);
      setEditMode(false);
    }

    useEffect(() => {
      
       agent.Activities.list().then((response)=>{
        response.forEach((activity)=>{
          activity.date = activity.date.split('.')[0];
        });
        setActivities(response);
      
       }).then(()=> setLoading(false))
    

      },[]);
     
      const openForm = ()=> {
        setSelectedActivity(null);
        setEditMode(true);

      }

      const handleCreateActivity =(activity:IActivity)=>{
        setsubmitting(true);
        agent.Activities.create(activity).then(()=>{

          setActivities([...activities,activity]);
          setEditMode(false);
          setSelectedActivity(activity);
        }).then(()=> setsubmitting(false));

     
      }
      const handleEditActivity =(activity:IActivity)=>{
        setsubmitting(true);
        agent.Activities.update(activity).then(()=>{
          console.log("in edit activity");
          setActivities([...activities.filter(a=> a.id !== activity.id),activity]);
          setEditMode(false);
          setSelectedActivity(activity);
        }).then(()=> setsubmitting(false));


       
      }
      const deleteActivityHandler = (id:string,e:React.MouseEvent<HTMLButtonElement,MouseEvent>) =>{
       setTarget(e.currentTarget.name);
        
        agent.Activities.delete(id).then(()=>{
          setActivities([...activities.filter(a=> a.id !== id)]);
          setSelectedActivity(null);
        }).then(()=> setsubmitting(false));
      
      }
      if(loading) return <LoadingComponent content={"...loading"} />
    return (
      <Fragment>
        <Navbar openForm ={openForm}></Navbar>
      
        <Container style={{marginTop:"7em"}}>
          <ActivityDashboard activities={activities} selectActivity ={selectActivityHandler} selectedActivity={selectedActivity!} editMode={editMode} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} editActivity={handleEditActivity} createActivity ={handleCreateActivity}  deleteActivity ={deleteActivityHandler} submitting ={submitting} target ={target}/>
          </Container>
        
      </Fragment>
  );
  }



  export default App;
