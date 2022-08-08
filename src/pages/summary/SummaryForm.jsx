import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SummaryForm = () => {
	const [tcChecked, setTcChecked] = useState(false);
	return (
		<Form>
			<Form.Group controlId="terms-and-conditons">
				<Form.Check
					type="checkbox"
					checked={tcChecked}
					onChange={() => setTcChecked(!tcChecked)}
					label="terms and conditions"
				/>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm Order
			</Button>
		</Form>
	);
};

export default SummaryForm;
