//import type { ComponentStyleConfig } from "@chakra-ui/theme";

const InputStyles = {
  baseStyle: {
    field: {
      width: "100%",
      borderColor: "black",
      borderRadius: "5px",
    },
  },

  variants: {
    main: {
      
    },

    settings:{
      borderColor: "red",
    },
  },
  defaultProps: {
    focusBorderColor: "brand.primary",
    // variant: "main",
  },
};

export default InputStyles;
