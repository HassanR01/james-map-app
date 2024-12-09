/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000124';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    text2: "#c2ab65",
    background: '#ffffff',
    tint: tintColorLight,
    loading: '#f1f8fb',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    text2: "#c2ab65",
    background: '#000124',
    tint: tintColorDark,
    loading: '#f1f8fb',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
