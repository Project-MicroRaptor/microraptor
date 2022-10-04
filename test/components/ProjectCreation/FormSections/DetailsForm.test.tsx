import { fireEvent, render } from "@testing-library/react";
import DetailsForm from "../../../../src/components/ProjectCreation/FormSections/DetailsForm";

describe("DetailsForm", () => {
  test("DetailsForm renders correctly", () => {
    const formData = {};
    render(
      <DetailsForm formData={formData} onFormChange={(id, value) => {}} />
    );
  });

  test("DetailsForm has form data pre-populated", () => {
    const formData = {
      aboutBusiness: "About Business Data",
      aboutOwner: "About Owner Data",
      businessPlan: "Business Plan Data",
    };

    const detailsForm = render(
      <DetailsForm formData={formData} onFormChange={(id, value) => {}} />
    );

    expect(detailsForm.getByText("About Business Data")).toBeTruthy();
    expect(detailsForm.getByText("About Owner Data")).toBeTruthy();
    expect(detailsForm.getByText("Business Plan Data")).toBeTruthy();
  });

  test("Can update formData", () => {
    const formData = {};
    let changedId;
    let changedValue;

    const detailsForm = render(
      <DetailsForm formData={formData} onFormChange={(id, value) => {
        changedId = id;
        changedValue = value;
      }} />
    );

    // Change aboutBusiness text
    const aboutBusiness = detailsForm.getByTestId("aboutBusiness");
    expect(aboutBusiness).toBeTruthy();
    fireEvent.change(aboutBusiness, {target: {value: "About Business Data"}});
    expect(changedId).toBe("aboutBusiness");
    expect(changedValue).toBe("About Business Data");

    // Change aboutOwner text
    const aboutOwner = detailsForm.getByTestId("aboutOwner");
    expect(aboutOwner).toBeTruthy();
    fireEvent.change(aboutOwner, {target: {value: "About Owner Data"}});
    expect(changedId).toBe("aboutOwner");
    expect(changedValue).toBe("About Owner Data");

    // Change businessPlan text
    const businessPlan = detailsForm.getByTestId("businessPlan");
    expect(businessPlan).toBeTruthy();
    fireEvent.change(businessPlan, {target: {value: "Business Plan Data"}});
    expect(changedId).toBe("businessPlan");
    expect(changedValue).toBe("Business Plan Data"); 
  });
});
