import { Container  } from "react-bootstrap";
import { Link } from 'react-router-dom'

export const Profile = () => {
  return (
    <Container>
      <div >
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <p>This is profile page.</p>
      <Link to={`/survey/`} >
        Survey Page
      </Link>
    </Container>
  )
}
