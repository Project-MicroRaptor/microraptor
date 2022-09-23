import { render } from "@testing-library/react";
import PhotosForm from "../../../../src/components/ProjectCreation/FormSections/PhotosForm";

describe("PhotosForm", () => {
  test("PhotosForm should render correctly", () => {
    const formData = {};
    render(<PhotosForm formData={formData} onFormChange={() => {}} />);
  });
});
