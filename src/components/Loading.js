import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

export default function Loading() {
  return (
    <Container className="mt-3 mx-auto">
      <Spinner animation="border" role="status">
      </Spinner>
    </Container>
  );
}
