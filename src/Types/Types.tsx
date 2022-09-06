import React, { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export interface SliceState {
  user: any;
  error: any;
}

export interface ResponseSlice {
  pending: any;
  fulfilled: any;
  rejected: any;
}
