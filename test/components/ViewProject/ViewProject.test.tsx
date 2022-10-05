import { fireEvent, render } from "@testing-library/react";
import ViewProject from "../../../src/components/ViewProject/ViewProject";
import { ProjectCategories } from "../../../src/types/categories";

describe("ViewProject", () => {
  test("ViewProject renders correctly", () => {
    // Renders with no props
    const { rerender } = render(<ViewProject owner={[]} />);

    // Renders with information
    rerender(
      <ViewProject
        id="0"
        name="Name"
        shortDescription="Short Description"
        images={["image"]}
        owner={[]}
        currentFunding={0}
        targetFunding={100}
        createdAt={Number(new Date(2022, 1, 1))}
        completedAt={Number(new Date())}
        categories={[
          ProjectCategories.Retail,
          ProjectCategories.ConsultingServices
        ]}
        aboutBusiness="aboutBusinessData"
        aboutOwner="aboutOwnerData"
        businessPlan="businessPlanData"
        rewards={[
          {
            name: "rewardName",
            description: "rewardDescription",
            cost: 300
          }
        ]}
      />
    );

    // Render with yesterday's Date.
    rerender(
      <ViewProject
        owner={[]}
        createdAt={new Date().getDate()}
        completedAt={new Date().getDate() - 1}
      />
    );
  });

  test("Sharing project should work correctly", () => {
    // Setup mocks for navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { }
      }
    });
    jest.spyOn(navigator.clipboard, "writeText");

    const container = render(
      <ViewProject
        name="Test Project"
        owner={[]}
        shortDescription="Test Short Description"
      />
    );

    const shareButton = container.getByTestId("share-button");
    expect(shareButton).toBeTruthy();

    fireEvent.click(shareButton);

    const shareModal = container.getByTestId("share-modal");
    expect(shareModal).toBeTruthy();

    const shareBody = `Test Project\n\nTest Short Description\n\nView the MicroRaptor project page here: ${window.location.href}`;
    expect(shareModal.textContent).toBe(shareBody);

    // Copy shareBody to clipboard
    const shareCopy = container.getByTestId("share-copy-button");
    expect(shareCopy).toBeTruthy();

    fireEvent.click(shareCopy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(shareBody);
  });
});
