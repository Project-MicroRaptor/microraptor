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
import { RadiusDistances } from "../../types/radiusDistances";
import { SearchType } from "../../types/search";

import styles from "./ProjectSearch.module.scss";

export default function ProjectSearch() {
  const [selectionState, setSelection] = useState(SearchType.Featured);
  const [categoryState, setCategory] = useState<string | null>(null);
  const [distanceState, setDistance] = useState<number | null>(null);

  function FeaturedOnClick() {
    setSelection(SearchType.Featured);
    setCategory(null);
    setDistance(null);
  }

  function CategoryOnClick(category: string) {
    setSelection(SearchType.Category);
    setCategory(category);
  }

  function SearchOnClick() {
    setSelection(SearchType.Search);
    setCategory(null);
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
          {categoryState == null ? "All Categories" : categoryState}
        </MenuButton>
        <MenuList>
          {Object.entries(ProjectCategories).map(([key, value]) => {
            return (
              <MenuItem key={key} onClick={() => CategoryOnClick(value)}>
                {value}
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
            {distanceState == null
              ? "Any Distance"
              : "< " + distanceState + "km"}
          </MenuButton>
          <MenuList>
            {Object.entries(RadiusDistances).map(([key, value]) => {
              return (
                <MenuItem key={key} onClick={() => setDistance(value)}>
                  {key}
                </MenuItem>
              );
            })}
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
