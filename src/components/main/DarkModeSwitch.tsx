import { BiSun, BiMoon } from "react-icons/bi";
import { useColorMode, IconButton } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const styleProps = {
    m: "1em",
    boxSize: "2.7em",
    pos: "absolute",
    bottom: "1em",
    right: "1em",
  } as const;

  const toggleMode = () => {
    browser.runtime.sendMessage({ msg: "TOGGLE_COLOR_MODE" });
    toggleColorMode();
  };

  if (isDark) {
    return (
      <IconButton
        borderRadius="33%"
        icon={<BiMoon color="lightblue" size="1.3em" />}
        aria-label="dark mode"
        onClick={toggleMode}
        {...styleProps}
      />
    );
  }
  return (
    <IconButton
      borderRadius="33%"
      icon={<BiSun color="goldenrod" size="1.3em" />}
      aria-label="light mode"
      onClick={toggleMode}
      {...styleProps}
    />
  );
};
