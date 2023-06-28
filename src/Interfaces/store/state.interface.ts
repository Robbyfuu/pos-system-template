import { IProduct, User } from "..";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IState {
  Layout: {
    layoutType?: "vertical" | "horizontal";
    layoutModeType?: "light" | "dark";
    layoutWidth?: "fluid" | "boxed" | "scrollable";
    leftSideBarTheme?: "dark" | "light" | "colored";
    leftSideBarThemeImage?: "none" | "img1" | "img2" | "img3" | "img4";
    leftSideBarType?: "default" | "compact" | "icon" | "condensed" | undefined;
    leftSideBarThemeTypes?:
      | "light"
      | "colored"
      | "dark"
      | "winter"
      | "ladylip"
      | "plumplate"
      | "strongbliss"
      | "greatwhale";
    topbarTheme?: "light" | "dark";
    isPreloader?: boolean;
    showRightSidebar?: boolean;
    isMobile?: boolean;
    showSidebar?: boolean;
    leftMenu?: boolean;
  };
  Login?: {
    loading?: boolean;
    error?: string;
  };
}
export interface IStateLogin {
  Login: {
    loading?: boolean;
    error?: string;
  };
}
export interface IStateRegister {
  Acount: {
    loading?: boolean;
    registrationError?: string;
    message?: string;
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  };
}
export interface IStateCart {
  Cart: {
    cart: IProduct[];
    loading?: boolean;
    error?: string;
  };
}
export interface IStateProducts {
  ecommerce: {
    products: IProduct[];
    productsPagination: IProduct[];
    loading?: boolean;
    error?: string;
    orders: IProduct[];
    pagination: {
      pageActual: number;
      limit: number;
      offset: number;
    };
  };
}
