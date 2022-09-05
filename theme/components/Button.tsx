const ButtonStyles = {
  variants: {
    base: {
      bg: "brand.primary",
      color: "white",
      _hover: {
        bg: "brand.hover",
        _disabled: {
          bg: "brand.primary",
        },
      },
    },
    settings: {
      width: "20%",
      bg: "white",
      color: "brand.primary",
      _hover: {
        bg: "brand.primary",
        color: "white",
      },
    },
  },
  defaultProps: {
    variant: "base",
  },
};

export default ButtonStyles;
