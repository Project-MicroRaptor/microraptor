import { fireEvent, getByTestId, render } from "@testing-library/react";
import ProjectSearch from "../../../src/components/ProjectSearch/ProjectSearch";
import { ProjectCategories } from "../../../src/types/categories";
import { RadiusDistances } from "../../../src/types/radiusDistances";
import { SearchType } from "../../../src/types/search";

describe("ProjectSearch", () => {
  test("ProjectSearch renders correctly", () => {
    render(
      <ProjectSearch
        selectionState={SearchType.Featured}
        setSelection={() => {}}
        categoryState={null}
        setCategory={() => {}}
        distanceState={null}
        setDistance={() => {}}
        searchState={null}
        setSearch={() => {}}
      />
    );
  });

  test("Swapping between Featured, Category & Distance should work correctly", () => {
    let selectionState = SearchType.Featured;
    let categoryState = null;
    let distanceState = null;
    const container = render(
      <ProjectSearch
        selectionState={selectionState}
        setSelection={(selection) => (selectionState = selection)}
        categoryState={categoryState}
        setCategory={(category) => (categoryState = category)}
        distanceState={distanceState}
        setDistance={(distance) => (distanceState = distance)}
        searchState={null}
        setSearch={() => {}}
      />
    );

    const { rerender } = container;

    // Check if featured and category buttons exist
    const featuredButton = container.getByTestId("featured-button");
    expect(featuredButton).toBeTruthy();
    const categoryButton = container.getByTestId("category-button");
    expect(categoryButton).toBeTruthy();

    // Click on category button and select Retail category
    fireEvent.click(categoryButton);
    const retail = container.getByTestId(ProjectCategories.Retail);
    expect(retail).toBeTruthy();

    fireEvent.click(retail);

    expect(selectionState).toBe(SearchType.Category);
    expect(categoryState).toBe(ProjectCategories.Retail);

    rerender(
      <ProjectSearch
        selectionState={selectionState}
        setSelection={(selection) => (selectionState = selection)}
        categoryState={categoryState}
        setCategory={(category) => (categoryState = category)}
        distanceState={distanceState}
        setDistance={(distance) => (distanceState = distance)}
        searchState={null}
        setSearch={() => {}}
      />
    );

    // Swap back to Featured
    fireEvent.click(featuredButton);
    expect(selectionState).toBe(SearchType.Featured);
    expect(categoryState).toBeNull();

    rerender(
      <ProjectSearch
        selectionState={selectionState}
        setSelection={(selection) => (selectionState = selection)}
        categoryState={categoryState}
        setCategory={(category) => (categoryState = category)}
        distanceState={distanceState}
        setDistance={(distance) => (distanceState = distance)}
        searchState={null}
        setSearch={() => {}}
      />
    );

    // Changing distance should work
    const distanceButton = container.getByTestId("distance-button");
    expect(distanceButton).toBeTruthy();

    fireEvent.click(distanceButton);
    fireEvent.click(container.getByTestId("< 10km"));

    expect(distanceState).toBe(RadiusDistances["< 10km"]);

    rerender(
      <ProjectSearch
        selectionState={selectionState}
        setSelection={(selection) => (selectionState = selection)}
        categoryState={categoryState}
        setCategory={(category) => (categoryState = category)}
        distanceState={distanceState}
        setDistance={(distance) => (distanceState = distance)}
        searchState={null}
        setSearch={() => {}}
      />
    );

    // Set distance to any
    fireEvent.click(distanceButton);
    fireEvent.click(container.getByTestId("anyDistance"));
    expect(distanceState).toBe(null);

    rerender(
      <ProjectSearch
        selectionState={selectionState}
        setSelection={(selection) => (selectionState = selection)}
        categoryState={categoryState}
        setCategory={(category) => (categoryState = category)}
        distanceState={distanceState}
        setDistance={(distance) => (distanceState = distance)}
        searchState={null}
        setSearch={() => {}}
      />
    );
  });

  jest.useFakeTimers();
  test("Searching for project works correctly", () => {
    let selectionState = SearchType.Featured;
    let searchState = null;

    const container = render(
      <ProjectSearch
        selectionState={SearchType.Featured}
        setSelection={(selection) => (selectionState = selection)}
        categoryState={null}
        setCategory={() => {}}
        distanceState={null}
        setDistance={() => {}}
        searchState={searchState}
        setSearch={(search) => (searchState = search)}
      />
    );

    const searchBar = container.getByTestId("search-bar");
    expect(searchBar).toBeTruthy();

    fireEvent.change(searchBar, { target: { value: "This is text" } });
    // Should not have changed yet. Debounce has not fired
    expect(searchState).toBe(null);
    expect(selectionState).toBe(SearchType.Search);

    // Debounce should have fired
    jest.runAllTimers();
    expect(searchState).toBe("This is text");

    // Send text twice
    fireEvent.change(searchBar, { target: { value: "This is new text" } });
    expect(searchState).toBe("This is text");

    fireEvent.change(searchBar, { target: { value: "This is more text" } });
    jest.runAllTimers();
    expect(searchState).toBe("This is more text");

    // Test clearing search
    fireEvent.change(searchBar, { target: { value: "" } });
    jest.runAllTimers();
    expect(searchState).toBe("");
    expect(selectionState).toBe(SearchType.Featured);
  });
});
