import { render } from "@testing-library/react";
import RewardsForm from "../../../../src/components/ProjectCreation/FormSections/RewardsForm";

describe("RewardsForm", () => {
  test("RewardsForm should render correctly", () => {
    const formData = {};
    render(<RewardsForm formData={formData} onFormChange={() => {}} />);
  });
});
