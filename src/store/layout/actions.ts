import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_THEME_IMAGE,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  SHOW_RIGHT_SIDEBAR,
  SHOW_SIDEBAR,
  CHANGE_PRELOADER,
  TOGGLE_LEFTMENU,
  CHANGE_LAYOUT_MODE,
} from "./actionTypes";

export const changeLayout = (layout: string) => ({
  type: CHANGE_LAYOUT,
  payload: layout,
});

export const changePreloader = (layout: string) => ({
  type: CHANGE_PRELOADER,
  payload: layout,
});

export const changeLayoutMode = (layoutMode: string) => ({
  type: CHANGE_LAYOUT_MODE,
  payload: layoutMode,
});

export const changeLayoutWidth = (width: string) => ({
  type: CHANGE_LAYOUT_WIDTH,
  payload: width,
});

export const changeSidebarTheme = (theme: string) => ({
  type: CHANGE_SIDEBAR_THEME,
  payload: theme,
});

export const changeSidebarThemeImage = (themeimage: string) => ({
  type: CHANGE_SIDEBAR_THEME_IMAGE,
  payload: themeimage,
});

export const changeSidebarType = (sidebarType: string, isMobile?: boolean) => {
  return {
    type: CHANGE_SIDEBAR_TYPE,
    payload: { sidebarType, isMobile },
  };
};

export const changeTopbarTheme = (topbarTheme: string) => ({
  type: CHANGE_TOPBAR_THEME,
  payload: topbarTheme,
});

export const showRightSidebarAction = (isopen: boolean) => ({
  type: SHOW_RIGHT_SIDEBAR,
  payload: isopen,
});

export const showSidebar = (isopen: boolean) => ({
  type: SHOW_SIDEBAR,
  payload: isopen,
});

export const toggleLeftmenu = (isopen: boolean) => ({
  type: TOGGLE_LEFTMENU,
  payload: isopen,
});
