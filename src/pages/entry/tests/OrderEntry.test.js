import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";

import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";

test("Handles errros for scoops and toppings routes", async () => {
  //reset the endpoint, as in "src/setupTests.js" then throw a deliberate error so we can test
  //read : https://mswjs.io/docs/api/setup-server/reset-handlers
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  //find the alerts, since the server is throwing a 500
  //using "waitFor" because there are 2 async calls instead of 1
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert"); //name param is somehow not getting read
    expect(alerts).toHaveLength(2);
  });
  //above, we're using "find" because we know it's going to be async, because we will catch the error from the ".catch" block from axios
});
