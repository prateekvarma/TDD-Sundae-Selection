import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
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

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  //popover starts out hidden
  const popOverText = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(popOverText).not.toBeInTheDocument();

  //popover appears on mouseover
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const thePopOverText = screen.getByText(/no ice cream will actually be delivered/i);
  expect(thePopOverText).toBeInTheDocument();

  //popover disappears when mouse out
  //Below the disappearance of the popover was happening async, so got the act() error
  //ref: https://testing-library.com/docs/guide-disappearance/#waiting-for-disappearance
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
});