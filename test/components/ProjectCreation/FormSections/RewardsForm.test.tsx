import { render } from "@testing-library/react";
import RewardsForm from "../../../../src/components/ProjectWizard/FormSections/RewardsForm";

describe("RewardsForm", () => {
  test("RewardsForm should render correctly", () => {
    const formData = {};
    const errors = {};

    render(
      <RewardsForm
        formData={formData}
        onFormChange={() => {}}
        errors={errors}
      />
    );
  });
});
