import {
  HStack,
  Button,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { ProjectCategories } from "../../types/categories";
import { RadiusDistances } from "../../types/radiusDistances";
import { SearchType } from "../../types/search";
import React, { useRef } from "react";
import { Location } from "../../types/location";
import styles from "./ProjectSearch.module.scss";
import LocationModal from "../LocationModal/LocationModal";

type ProjectSearchProps = {
  selectionState: SearchType;
  setSelection: (selection: SearchType) => void;
  categoryState: string | null;
  setCategory: (category: string | null) => void;
  distanceState: number | null;
  setDistance: (distance: number | null) => void;
  searchState: string | null;
  setSearch: (search: string | null) => void;
  locationState: Location | null;
  setLocation: (location: Location | null) => void;
};

export default function ProjectSearch(props: ProjectSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen: isLocationOpen,
    onOpen: onLocationOpen,
    onClose: onLocationClose
  } = useDisclosure();

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

  function onLocationSelect(location: Location | null) {
    props.setLocation(location);

    if (location == null) {
      props.setDistance(null);
      return;
    }

    if (!props.distanceState) {
      props.setDistance(RadiusDistances["< 5km"]);
    }
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
        data-testid="featured-button"
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
          data-testid="category-button"
        >
          {props.categoryState == null ? "All Categories" : props.categoryState}
        </MenuButton>
        <MenuList
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.15)`,
              borderRadius: "30px"
            }
          }}
          maxHeight="300px"
          overflowY="scroll"
        >
          {Object.entries(ProjectCategories).map(([key, value]) => {
            return (
              <MenuItem
                key={key}
                onClick={() => onCategoryClick(value)}
                data-testid={key}
              >
                {value}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      <HStack>
        <Menu>
          <MenuButton
            {...(props.selectionState == SearchType.Category
              ? {}
              : { variant: "outline" })}
            as={Button}
            _focus={{ boxShadow: "none" }}
            onClick={onLocationOpen}
          >
            {props.locationState == null
              ? "All Locations"
              : props.locationState.locality}
          </MenuButton>
        </Menu>
        <LocationModal
          isOpen={isLocationOpen}
          onClose={onLocationClose}
          selectLocation={(location) => onLocationSelect(location)}
        />
      </HStack>

      <HStack>
        <Menu>
          <MenuButton
            variant="outline"
            as={Button}
            _focus={{ boxShadow: "none" }}
            data-testid="distance-button"
          >
            {props.distanceState == null
              ? "Any Distance"
              : "< " + props.distanceState + "km"}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => props.setDistance(null)}
              data-testid="anyDistance"
            >
              Any Distance
            </MenuItem>
            {Object.entries(RadiusDistances).map(([key, value]) => {
              return (
                <MenuItem
                  key={key}
                  data-testid={key}
                  onClick={() => props.setDistance(value)}
                >
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
          data-testid="search-bar"
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
