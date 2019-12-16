  import React ,{ Fragment} from 'react';
  import {Container} from 'semantic-ui-react';
import Navbar from '../../features/navigation/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route,withRouter, RouteComponentProps } from 'react-router';
import Home from './Home';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

  const App :React.FC<RouteComponentProps> =  ({location})  => {


    
    return (
      <Fragment>
         <Route exact path='/' component={Home}></Route>
         <Route path='/(.+)' render = {()=> { return (
          <Fragment>
          <Navbar></Navbar>
      
          <Container style={{marginTop:"7em"}}>
      
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route key= {location.key}  path= {['/createActivity','/manage/:id'] }component={ActivityForm}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
        </Container>
          </Fragment>
)
         }}></Route>
      
        
      </Fragment>
  );
  }



  export default withRouter(observer(App));
