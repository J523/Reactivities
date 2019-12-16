
import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

interface Iprops{

}

const Navbar : React.FC<Iprops> = () => {
const activityStore = useContext(ActivityStore);


    return (
          <Menu fixed="top" inverted >
            <Container>
            <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style ={{marginRight:"10px"}}/> <NavLink to='/' >Reactivities</NavLink>  
            </Menu.Item>
          <Menu.Item><NavLink to='/activities' >Activities</NavLink> </Menu.Item>
          <Menu.Item>
                <Button onClick={activityStore.openForm} positive> <NavLink to='/createActivity' >Create Activity</NavLink></Button>
                </Menu.Item>
            </Container>       
    
      </Menu>
    )
}

export default observer(Navbar);
