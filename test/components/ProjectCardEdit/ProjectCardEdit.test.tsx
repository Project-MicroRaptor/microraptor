import { render } from "@testing-library/react"
import ProjectCardEdit from "../../../src/components/ProjectCardEdit/ProjectCardEdit";

describe("ProjectCardEdit", () => {
  test("ProjectCardEdit renders correctly", () => {
    render(
      <ProjectCardEdit 
        id="1"
        name="Test Project"
        shortDescription="Short Description"
        currentFunding={0}
        targetFunding={0}
      />
    );
  })
})