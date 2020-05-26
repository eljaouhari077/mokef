import React from "react";
import { Player } from "video-react";
import Description from "./description/description.video";
import styled from "styled-components";
import Video from "../../../assets/video.mp4";
import DesktopBreakpoint from "../../../components/responsiveness/desktop_breakpoint";
import LaptopBreakpoint from "../../../components/responsiveness/laptop_breakpoint";

const Root = styled.div`
  padding: 1rem;
  margin: 3rem 0;

  @media (min-width: 1000px) {
    display: flex;
    justify-content: space-between;
  }
`;

const VideoContainer = () => {
  return (
    <Root>
      <DesktopBreakpoint>
        <Player src={Video} fluid={false} height={340} />
      </DesktopBreakpoint>
      <LaptopBreakpoint>
        <Player src={Video} />
      </LaptopBreakpoint>
      <Description />
    </Root>
  );
};

export default VideoContainer;
