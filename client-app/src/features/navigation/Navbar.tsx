
import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';

interface Iprops{

}

const Navbar : React.FC<Iprops> = () => {
const activityStore = useContext(ActivityStore);


    return (
          <Menu fixed="top" inverted >
            <Container>
            <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style ={{marginRight:"10px"}}/> Reactivities
            </Menu.Item>
          <Menu.Item
            name='Activities'
          />
          <Menu.Item>
                <Button onClick={activityStore.openForm} positive>Create Activity</Button>
                </Menu.Item>
            </Container>       
    
      </Menu>
    )
}

export default observer(Navbar);
