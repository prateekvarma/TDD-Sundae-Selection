import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need the provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirm page does not need the provider */}
    </Container>
  );
}

export default App;
