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

  function onFeaturedClick() {
    props.setSelection(SearchType.Featured);
    props.setCategory(null);
    props.setSearch(null);
    if (inputRef.current != null) inputRef.current.value = "";
  }

  function onCategoryClick(category: string) {
    props.setSelection(SearchType.Category);
    props.setCategory(category);
    props.setSearch(null);
    if (inputRef.current != null) inputRef.current.value = "";
  }

  function performSearch() {
    if (inputRef.current != null) {
      props.setSearch(inputRef.current.value);
      if (inputRef.current.value == "") props.setSelection(SearchType.Featured);
    }
  }

  // Delay by timeout while still typing before performing search.
  let timer: NodeJS.Timeout;
  function debounce(func: Function, timeout = 500) {
    props.setSelection(SearchType.Search);
    props.setCategory(null);
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
        onClick={onFeaturedClick}
        _focus={{ boxShadow: "none" }}
      >
        Featured
      </Button>

      <Menu>
        <MenuButton
          {...(props.selectionState == SearchType.Category
            ? {}
            : { variant: "outline" })}
          as={Button}
          _focus={{ boxShadow: "none" }}
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
              <MenuItem key={key} onClick={() => onCategoryClick(value)}>
                {value}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      <HStack className={styles.areaContainer}>
        <Button variant="outline" disabled _focus={{ boxShadow: "none" }}>
          All Locations
        </Button>

        <Menu>
          <MenuButton
            variant="outline"
            as={Button}
            _focus={{ boxShadow: "none" }}
          >
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
          onChange={() => debounce(() => performSearch())}
          _focus={{ boxShadow: "none" }}
        />
        <IconButton
          variant="outline"
          aria-label="Search Projects"
          icon={<BsSearch />}
          onClick={performSearch}
          _focus={{ boxShadow: "none" }}
        />
      </HStack>
    </div>
  );
}
