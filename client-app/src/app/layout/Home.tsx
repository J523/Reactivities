import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Container style={{marginTop:"7em"}}>
           <h2>Home</h2> 
           <h3>Go To <Link to={'/activities'}>Activities</Link> </h3>
        </Container>
    )
}

export default Home;
