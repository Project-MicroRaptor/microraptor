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
import React, { useRef } from "react";

import styles from "./ProjectSearch.module.scss";

type ProjectSearchProps = {
  selectionState: SearchType;
  setSelection: React.Dispatch<React.SetStateAction<SearchType>>;
  categoryState: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  distanceState: number | null;
  setDistance: React.Dispatch<React.SetStateAction<number | null>>;
  searchState: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ProjectSearch(props: ProjectSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function FeaturedOnClick() {
    props.setSelection(SearchType.Featured);
    props.setCategory(null);
    props.setSearch(null);
    if (inputRef.current != null) inputRef.current.value = "";
  }

  function CategoryOnClick(category: string) {
    props.setSelection(SearchType.Category);
    props.setCategory(category);
  }

  function PerformSearch() {
    if (props.selectionState == SearchType.Featured)
      props.setSelection(SearchType.Search);

    if (inputRef.current != null) {
      props.setSearch(inputRef.current.value);
    }

    console.log("Searched");
  }

  let timer: NodeJS.Timeout;
  function debounce(func: Function, timeout = 500) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(func);
    }, timeout);
  }

  return (
    <div className={styles.container}>
      <Button
        {...(props.selectionState == SearchType.Featured
          ? {}
          : { variant: "outline" })}
        onClick={FeaturedOnClick}
      >
        Featured
      </Button>

      <Menu>
        <MenuButton
          {...(props.selectionState == SearchType.Category
            ? {}
            : { variant: "outline" })}
          as={Button}
        >
          {props.categoryState == null ? "All Categories" : props.categoryState}
        </MenuButton>
        <MenuList
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.15)`,
              borderRadius: "30px",
            },
          }}
          maxHeight="300px"
          overflowY="scroll"
        >
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
            {props.distanceState == null
              ? "Any Distance"
              : "< " + props.distanceState + "km"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => props.setDistance(null)}>
              Any Distance
            </MenuItem>
            {Object.entries(RadiusDistances).map(([key, value]) => {
              return (
                <MenuItem key={key} onClick={() => props.setDistance(value)}>
                  {key}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </HStack>

      <HStack className={styles.searchContainer}>
        <Input
          placeholder="Search by keyword..."
          ref={inputRef}
          onChange={() => debounce(() => PerformSearch())}
        />
        <IconButton
          variant="outline"
          aria-label="Search Projects"
          icon={<BsSearch />}
          onClick={PerformSearch}
        />
      </HStack>
    </div>
  );
}
