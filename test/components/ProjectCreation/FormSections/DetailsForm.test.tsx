import { render } from "@testing-library/react"
import DetailsForm from "../../../../src/components/ProjectCreation/FormSections/DetailsForm"

describe("DetailsForm", () => {
  test("DetailsForm renders correctly", () => {
    const formData = {};
    render(<DetailsForm formData={formData} onFormChange={(id, value) => {}} />)
  })

  test("DetailsForm has form data pre-populated", () => {
    const formData = {
      aboutBusiness: "About Business Data",
      aboutOwner: "About Owner Data",
      businessPlan: "Business Plan Data",
    };

    const detailsForm = render(<DetailsForm formData={formData} onFormChange={(id, value) => {}} />);

    expect(detailsForm.getByText("About Business Data")).toBeTruthy();
    expect(detailsForm.getByText("About Owner Data")).toBeTruthy();
    expect(detailsForm.getByText("Business Plan Data")).toBeTruthy();
  })
})