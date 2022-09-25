import { render } from "@testing-library/react";
import NavBar from "../../../src/components/NavBar/NavBar";

describe("NavBar", () => {
  test("Nav bar renders correctly", async () => {
    render(<NavBar />);
  });
});
