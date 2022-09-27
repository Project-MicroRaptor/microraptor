import { render } from "@testing-library/react";
import ProjectCard from "../../../src/components/ProjectCard/ProjectCard";

describe("ProjectCard", () => {
  test("ProjectCard renders correctly", () => {
    render(
      <ProjectCard
        id="1"
        name="Test Project"
        shortDescription="Short Description"
        currentFunding={0}
        targetFunding={0}
      />
    );
  });
});
