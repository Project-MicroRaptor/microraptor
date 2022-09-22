const InputStyles = {
  variants: {
    settings: {
      field: {
        borderColor: "white",
        width: "75%",
        _hover: {
          border: "2px",
          color: "brand.primary",
        },
        _focus: {
          border: "2px",
          color: "brand.primary",
        }
      },
    },
  },
  baseStyle: {
    field: {
      width: "100%",
      borderColor: "black",
      borderRadius: "5px",
    },
  },
  defaultProps: {
    focusBorderColor: "brand.primary"
  }
};

export default InputStyles;
