  import React ,{ Fragment} from 'react';
  import {Container} from 'semantic-ui-react';
import Navbar from '../../features/navigation/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route,withRouter, RouteComponentProps, Switch } from 'react-router';
import Home from './Home';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify'

  const App :React.FC<RouteComponentProps> =  ({location})  => {


    
    return (
      <Fragment>
       <ToastContainer position="bottom-right"/>
         <Route exact path='/' component={Home}></Route>
         <Route path='/(.+)' render = {()=> { return (
          <Fragment>
          <Navbar></Navbar>
      
          <Container style={{marginTop:"7em"}}>
          <Switch>
            <Route exact path='/activities' component={ActivityDashboard}></Route>
            <Route key= {location.key}  path= {['/createActivity','/manage/:id'] }component={ActivityForm}></Route>
            <Route path='/activities/:id' component={ActivityDetails}></Route>
            <Route component={NotFound}></Route>
            </Switch>
            </Container>
          </Fragment>
)
         }}></Route>
      
     
      </Fragment>
  );
  }



  export default withRouter(observer(App));
