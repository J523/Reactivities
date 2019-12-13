  import React ,{ useEffect, Fragment, useContext} from 'react';
  import {Container} from 'semantic-ui-react';
import Navbar from '../../features/navigation/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import {observer} from 'mobx-react-lite'

  const App = () => {


    //make the store available to this component
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      //here our loadActivities function depends on the mobX activityStore so we have to give that as a dependency
      activityStore.loadActivities();

      },[activityStore]);
     
      if(activityStore.loadingIndicator) return <LoadingComponent content={"...loading"} />
        /*use the state of activities from the store*/
    return (
      <Fragment>
        <Navbar></Navbar>
      
        <Container style={{marginTop:"7em"}}>
        
          <ActivityDashboard/>
          </Container>
        
      </Fragment>
  );
  }



  export default observer(App);
