import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import colors from "./colors";

// Component style overrides
import Button from "./components/Button";
import Progress from "./components/Progress";

const overrides = {
  colors,
  components: {
    Button,
    Progress,
  },
};

export default extendTheme(overrides);
