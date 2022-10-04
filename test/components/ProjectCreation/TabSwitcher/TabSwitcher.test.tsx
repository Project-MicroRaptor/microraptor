import { fireEvent, render } from "@testing-library/react";
import { BsAlarm, BsApple } from "react-icons/bs";
import TabSwitcher from "../../../../src/components/ProjectCreation/TabSwitcher/TabSwitcher";

describe("TabSwitcher", () => {
  const tabs = [
    {
      name: "Test 1",
      icon: <BsAlarm />,
    },
    {
      name: "Test 2",
      icon: <BsApple />,
    },
  ];

  test("TabSwitcher renders correctly", () => {
    render(<TabSwitcher tabs={tabs} selectedTab={0} onChangeTab={() => {}} />);
  });

  test("TabSwitcher should switch tabs", () => {
    let selectedTab = 0;

    const tabSwitcher = render(<TabSwitcher tabs={tabs} selectedTab={0} onChangeTab={(tab) => selectedTab = tab} />);

    const tab2 = tabSwitcher.getByText("Test 2");
    expect(tab2).toBeTruthy();

    // Click second tab
    fireEvent.click(tab2);
    expect(selectedTab).toBe(1);
  })
});
