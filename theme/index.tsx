import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import colors from "./colors";

// Component style overrides
import Button from "./components/Button";

const overrides = {
  colors,
  components: {
    Button,
  },
};

export default extendTheme(overrides);
