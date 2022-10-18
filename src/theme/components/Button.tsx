const ButtonStyles = {
  variants: {
    base: {
      bg: "brand.primary",
      color: "white",
      _hover: {
        bg: "brand.hover",
        _disabled: {
          bg: "brand.primary"
        }
      }
    },
    deactivate: {
      color: "var(--chakra-colors-red-600)",
      border: "1px solid var(--chakra-colors-red-500)",
      bg: "white",
      _hover: {
        bg: "var(--chakra-colors-red-600)",
        color: "white"
      }
    },
    settings: {
      width: "20%",
      bg: "white",
      color: "brand.primary",
      _hover: {
        bg: "brand.primary",
        color: "white"
      }
    },
    settingsMenu: {
      bg: "white",
      color: "black",
      _hover: {
        bg: "brand.primary",
        color: "white"
      }
    }
  },
  defaultProps: {
    variant: "base"
  }
};

export default ButtonStyles;
