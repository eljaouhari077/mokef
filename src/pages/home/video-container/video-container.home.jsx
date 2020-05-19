import React from "react";
import { Player } from "video-react";
import Video from "../../../assets/video.mp4";
import Description from "./description/description.video";
import styled from "styled-components";
import DesktopBreakpoint from "../../../components/responsiveness/desktop_breakpoint";
import LaptopBreakpoint from "../../../components/responsiveness/laptop_breakpoint";

const Root = styled.div`
  padding: 1rem;

  @media (min-width: 1000px) {
    display: flex;
    justify-content: space-between;
  }
`;

const VideoContainer = () => {
  return (
    <Root>
      <DesktopBreakpoint>
        <Player src={Video} fluid={false} height={350} />
      </DesktopBreakpoint>
      <LaptopBreakpoint>
        <Player src={Video} />
      </LaptopBreakpoint>
      <Description />
    </Root>
  );
};

export default VideoContainer;
