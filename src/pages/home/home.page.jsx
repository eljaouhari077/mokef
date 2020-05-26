import React from "react";
import Header from "./header/header.home";
import Announces from "../../components/announces/announces";
import { SelectedJobContext } from "../../contexts/selected-job.context";
import { FirebaseContext } from "../../firebase";
import { getAllAnnounces, getUserFromRef } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";
import VideoContainer from "./video-container/video-container.home";
import HowItWorks from "./how-it-works/how-it-works";
import Testimonials from "./testimonials/testimonials";
import Sponsors from "./sponsors/sponsors.home";
import { Divider } from "antd";
import TabletBreakpoint from "../../components/responsiveness/tablet_breakpoint";
import PhoneBreakpoint from "../../components/responsiveness/phone_breakpoint";
import { Flex } from "../../components/shared/shared.styled";
import styled from "styled-components";

const MaxWidth = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled(Flex)`
  padding: 2rem;
  border-radius: 2rem;
  margin-top: -4rem;
  margin-bottom: 1rem;
  background: #fff;
`;

const HomePage = () => {
  const [announces, setAnnounces] = React.useState([]);
  const { selectedJob } = React.useContext(SelectedJobContext);
  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    assignAnnouncesForSelectedJob();

    // eslint-disable-next-line
  }, [selectedJob]);

  const assignAnnouncesForSelectedJob = async () => {
    if (selectedJob) {
      const announcesRefs = await getAllAnnounces(fb);
      const allAnnounces = announcesRefs.docs.map((announce) => ({
        ...announce.data(),
        id: announce.id,
      }));
      const allAnnouncesWithUserData = await Promise.all(
        allAnnounces.map((announce) =>
          getUserFromRef(fb, announce.user).then((user) => ({
            ...announce,
            user: user.data(),
          }))
        )
      );
      const allAnnouncesWithUserDataAndImageURL = await Promise.all(
        allAnnouncesWithUserData.map((announce) => {
          if (announce.user.avatarURL) {
            return getStorageFile(fb, announce.user.avatarURL).then(
              (avatarURL) => ({
                ...announce,
                user: { ...announce.user, avatarURL },
              })
            );
          } else {
            return announce;
          }
        })
      );

      setAnnounces(
        allAnnouncesWithUserDataAndImageURL.filter(
          (announce) => announce.category === selectedJob
        )
      );
    }
  };

  const displayAnnounces = () => (
    <>
      <TabletBreakpoint>
        <Container>
          <Announces announces={announces} />
        </Container>
      </TabletBreakpoint>
      <PhoneBreakpoint>
        <Announces announces={announces} />
      </PhoneBreakpoint>
    </>
  );

  return (
    <div>
      <Header />
      <MaxWidth>
        {selectedJob && displayAnnounces()}
        <VideoContainer />
        <HowItWorks />
        <Testimonials />
        <Divider type="horizontal" />
        <Sponsors />
      </MaxWidth>
    </div>
  );
};

export default HomePage;
