import React from "react";
import PrivateHeader from "../components/PrivateHeader";
import { Outlet } from "react-router-dom";
function PrivateLayout() {
  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
}

export default PrivateLayout;
