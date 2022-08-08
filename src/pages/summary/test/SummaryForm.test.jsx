import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);

  //check if there is a checkbox labelled "terms and conditions"
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  //check if there is a button called "confirm order"
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(button).toBeDisabled();
});

test("Checkbox enables button on first click, and disables on the 2nd", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const button = screen.getByRole("button", { name: /confirm order/i });

  //check the checkbox and see if the button is enabled
  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  //click the checkbox again, and expect the button to be disabled
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});
