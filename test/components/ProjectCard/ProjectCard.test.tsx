import { render } from "@testing-library/react";
import ProjectCard from "../../../src/components/ProjectCard/ProjectCard";

describe("ProjectCard", () => {
  test("ProjectCard renders correctly", () => {
    const { rerender } = render(
      <ProjectCard
        id="1"
        name="Test Project"
        shortDescription="Short Description"
        currentFunding={0}
        targetFunding={0}
      />
    );

    // Rerender with image
    rerender(
      <ProjectCard
        id="2"
        name="Test Project"
        shortDescription="Short Description"
        currentFunding={0}
        targetFunding={0}
        image="test.png"
      />
    );
  });
});
