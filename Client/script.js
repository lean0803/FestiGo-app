import Head from 'next/head';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid>
      <Head>
        <title>FestiGo</title>
      </Head>

      <header className="text-center py-5" style={{backgroundColor: '#f8f9fa'}}>
        <h1>FestiGo</h1>
        <h2>Explore, Track, and Share the Experience</h2>
        <Form className="d-flex my-3">
          <Form.Control
            type="search"
            placeholder="Search for an event"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <div className="mt-3">
          <Button variant="secondary" className="me-2">Category</Button>
          <Button variant="primary">Join</Button>
        </div>
      </header>

      <Container>
        <h3 className="my-4">Popular</h3>
        <Row className="mb-4">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/path/to/image1.jpg" />
              <Card.Body>
                <Card.Title>Comifuro</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/path/to/image2.jpg" />
              <Card.Body>
                <Card.Title>Ryoji Ikeda</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="/path/to/image3.jpg" />
              <Card.Body>
                <Card.Title>Formula E</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h3 className="my-4">Upcoming Events</h3>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Yoasobi</Card.Title>
                <Card.Text>26-27 Feb 2025 at Istora Senayan, Jakarta</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Jakarta E-Prix</Card.Title>
                <Card.Text>3 - 4 Juni 2025</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Java Jazz</Card.Title>
                <Card.Text>30 May - 1 June 2025 at JIEXPO Kemayoran</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Comic Frontier</Card.Title>
                <Card.Text>24 - 25 May 2025 at ICE BSD</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;