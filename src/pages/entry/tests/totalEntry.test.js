import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update the scoop subtotal amount, when scoops are added/removed", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  //make sure the subtotal starts out as $0.00
  const scoopsText = screen.getByText("Scoops total: $", { exact: false }); //we're using exact as false because we know we're testing just an incomplete part of the string.
  //Read more about getByText options : https://testing-library.com/docs/queries/bytext/
  expect(scoopsText).toHaveTextContent("0.00");

  //add vanilla scoop to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput); //clear it just in case
  userEvent.type(vanillaInput, "1"); //passed "1" as input value. A string is required by spinbutton
  expect(scoopsText).toHaveTextContent("2.00"); //Since each scoop is worth $2.00

  //update the chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsText).toHaveTextContent("6.00");
});
