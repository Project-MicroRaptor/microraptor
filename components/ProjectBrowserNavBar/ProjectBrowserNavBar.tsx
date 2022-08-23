import styles from "./ProjectBrowserNavBar.module.scss";
import { useState } from "react";
import {
  HStack,
  Button,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { ProjectCategories } from "../../types/categories";
import { SearchType } from "../../types/search";

export default function BrowseBar() {
  const [selectionState, setSelection] = useState(SearchType.Featured);
  const [categoryState, setCategory] = useState("Category");
  const [distanceState, setDistance] = useState("Any Distance");

  function FeaturedOnClick() {
    setSelection(SearchType.Featured);
    setCategory("Category");
    setDistance("Any Distance");
  }

  function CategoryOnClick(category: string) {
    setSelection(SearchType.Category);
    setCategory(category);
  }

  function SearchOnClick() {
    setSelection(SearchType.Search);
    setCategory("Category");
  }

  return (
    <div className={styles.container}>
      <Button
        {...(selectionState == SearchType.Featured
          ? {}
          : { variant: "outline" })}
        onClick={FeaturedOnClick}
      >
        Featured
      </Button>
      <Menu>
        <MenuButton
          {...(selectionState == SearchType.Category
            ? {}
            : { variant: "outline" })}
          as={Button}
        >
          {categoryState}
        </MenuButton>
        <MenuList>
          {Object.keys(ProjectCategories).map((category) => {
            return (
              <MenuItem
                key={category}
                onClick={() => CategoryOnClick(category)}
              >
                {category}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      <HStack className={styles.areaContainer}>
        <Button variant="outline" disabled>
          All Locations
        </Button>
        <Menu>
          <MenuButton variant="outline" as={Button}>
            {distanceState}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setDistance("< 5km")}>&lt; 5km</MenuItem>
            <MenuItem onClick={() => setDistance("< 10km")}>&lt; 10km</MenuItem>
            <MenuItem onClick={() => setDistance("< 20km")}>&lt; 20km</MenuItem>
            <MenuItem onClick={() => setDistance("< 50km")}>&lt; 50km</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <HStack className={styles.searchContainer}>
        <Input placeholder="Search by keyword..." />
        <IconButton
          variant="outline"
          aria-label="Search Projects"
          icon={<BsSearch onClick={SearchOnClick} />}
        />
      </HStack>
    </div>
  );
}
