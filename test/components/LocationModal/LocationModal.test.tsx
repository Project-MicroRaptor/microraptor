import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LocationModal from "../../../src/components/LocationModal/LocationModal";

describe("LocationModal", () => {
  test("LocationModal renders correctly", async () => {
    const locationModal = render(
      <LocationModal isOpen onClose={() => {}} selectLocation={() => {}} />
    );

    const selectedLocation = locationModal.getByText("All Locations");
    expect(selectedLocation).toBeTruthy();
  });

  test("Can change location search", async () => {
    const locationModal = render(
      <LocationModal isOpen onClose={() => {}} selectLocation={() => {}} />
    );

    const input = locationModal.getByTestId("locationInput");
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: "Melbourne" } });

    const { rerender } = locationModal;

    rerender(
      <LocationModal isOpen onClose={() => {}} selectLocation={() => {}} />
    );
  });
});
