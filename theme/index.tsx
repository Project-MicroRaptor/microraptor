import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import colors from "./colors";

// Component style overrides
import Button from "./components/Button";
import Progress from "./components/Progress";
import Input from "./components/Input";
import Textarea from "./components/Textarea";

const overrides = {
  colors,
  components: {
    Button,
    Progress,
    Input,
    Textarea,
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  }
};

export default extendTheme(overrides);
