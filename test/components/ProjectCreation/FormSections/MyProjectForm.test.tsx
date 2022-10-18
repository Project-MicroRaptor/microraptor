import { render } from "@testing-library/react";
import MyProjectForm from "../../../../src/components/ProjectWizard/FormSections/MyProjectForm";

describe("MyProjectForm", () => {
  test("MyProjectForm should render correctly", () => {
    const formData = {};
    render(
      <MyProjectForm formData={formData} onFormChange={() => {}} errors={{}} />
    );
  });

  test("MyProjectForm has data pre-populated", () => {
    const formData = {
      name: "nameData",
      shortDescription: "shortDescriptionData",
      targetFunding: 100000,
      completedAt: new Date(2022, 1, 1),
      location: {
        id: 1,
        locality: "Melbourne",
        state: "VIC",
        postcode: 3000,
        longitude: 0,
        latitude: 0
      }
    };

    const projectForm = render(
      <MyProjectForm formData={formData} onFormChange={() => {}} errors={{}} />
    );

    expect(projectForm.getByDisplayValue("nameData")).toBeTruthy();
    expect(projectForm.getByDisplayValue("shortDescriptionData")).toBeTruthy();
    expect(projectForm.getByDisplayValue("100,000")).toBeTruthy();
    expect(projectForm.getByDisplayValue("01/02/2022")).toBeTruthy();
    expect(projectForm.getByDisplayValue("Melbourne, 3000")).toBeTruthy();
  });
});
