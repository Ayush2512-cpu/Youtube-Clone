import React from "react";
import { ButtonList, VideoContainer } from "./index";

const MainContainer = () => {
  return (
    <div className="flex-grow mt-[65px]">
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
