import { rest } from "msw";
//check https://mswjs.io/

export const handlers = [
  rest.get("http://localhost:3030", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];
