import { useState } from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";

const popover = (
  <Popover id="popover-basic">
      No ice cream will actually be delivered
  </Popover>
);

const checkBoxLabel = (
  <span>
    I agree to 
    <OverlayTrigger placement="right" overlay={popover}>
      <span>terms and conditions</span>
    </OverlayTrigger>
  </span>
);

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditons">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={() => setTcChecked(!tcChecked)}
          label={checkBoxLabel} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}

export default SummaryForm;
