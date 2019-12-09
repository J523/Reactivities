
import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface Iprops{
openForm : () => void
}

const Navbar : React.FC<Iprops> = ({openForm}) => {
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
                <Button onClick={openForm} positive>Create Activity</Button>
                </Menu.Item>
            </Container>       
    
      </Menu>
    )
}

export default Navbar;
