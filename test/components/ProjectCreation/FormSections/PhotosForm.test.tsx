import { render } from "@testing-library/react";
import PhotosForm from "../../../../src/components/ProjectCreation/FormSections/PhotosForm";

describe("PhotosForm", () => {
  test("PhotosForm should render correctly", () => {
    const formData = {};
    const errors = {};

    render(
      <PhotosForm formData={formData} onFormChange={() => {}} errors={errors} />
    );
  });
});
