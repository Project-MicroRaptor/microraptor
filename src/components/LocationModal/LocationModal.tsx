import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/swr";

import type { Location } from "../../types/location";

import styles from "./LocationModal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectLocation: (location: Location | null) => void;
};

export default function LocationModal(props: Props) {
  const { isOpen, onClose, selectLocation } = props;
  const [searchState, setSearchState] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const finalRef = useRef(null);

  let queryString = "/api/locations?";
  if (searchState) {
    queryString += new URLSearchParams({ search: searchState });
  }

  const { data } = useSWR<Location[]>(
    !!searchState ? queryString : null,
    fetcher
  );

  let timer: NodeJS.Timeout;
  function debounce(func: Function, timeout = 500) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(func);
    }, timeout);
  }

  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Location</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" textAlign="center" data-testid="selectedLocation">
            Selected Location:{" "}
            {selectedLocation
              ? `${selectedLocation.locality}, ${selectedLocation.postcode}`
              : "All Locations"}
          </Text>
          <Box
            borderRadius={10}
            border="1px solid black"
            padding={1}
            marginBottom={5}
          >
            <Box
              height={300}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px"
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `rgba(0, 0, 0, 0.15)`,
                  borderRadius: "30px"
                }
              }}
              overflowX="auto"
            >
              {data &&
                Object.entries(data).map(([key, value]) => {
                  return (
                    <div
                      className={styles.locationBox}
                      key={key}
                      onClick={() => setSelectedLocation(value)}
                    >
                      <span
                        className={
                          selectedLocation?.id == value.id
                            ? styles.selected
                            : ""
                        }
                      >
                        {value.locality}, {value.postcode}
                      </span>
                    </div>
                  );
                })}
            </Box>
          </Box>
          <Input
            data-testid="locationInput"
            onChange={(event) => {
              debounce(() => setSearchState(event.target.value));
              setSearchInput(event.target.value);
            }}
            value={searchInput}
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={() => setSelectedLocation(null)}>
            All Locations
          </Button>
          <Button
            onClick={() => {
              selectLocation(selectedLocation);
              onClose();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
