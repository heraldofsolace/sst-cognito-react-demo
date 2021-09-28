import "./App.css";
import { Auth } from "aws-amplify";
import { Button, Col, Row, Container } from "react-bootstrap";

const Authentication = () => {
  return (
    <>
      <Container>
        <Row style={{ padding: "50px" }}>
          <Col>
            <div>
              <Button
                variant="primary"
                onClick={() =>
                  Auth.federatedSignIn({
                    provider: "Facebook",
                  })
                }
              >
                {" "}
                Login with Facebook
              </Button>
            </div>
          </Col>
          <Col>
            <Button onClick={() => Auth.federatedSignIn()}> Login </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Authentication;
