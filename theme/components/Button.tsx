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
  },
  defaultProps: {
    variant: "base",
  },
};

export default ButtonStyles;
