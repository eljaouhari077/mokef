import React from "react";
import { Modal, Row, Col, Card, Empty } from "antd";
import { getAnnounce } from "../../../../utils/dao";
import { FirebaseContext } from "../../../../firebase";
import { getStorageFile } from "../../../../utils/storage";
import NotFound from "../../../../assets/notfound.jpg";
import Img from "react-image";
import { withRouter } from "react-router-dom";

const ContractsModal = ({
  isVisible,
  setIsVisible,
  selectedContact,
  history,
}) => {
  const fb = React.useContext(FirebaseContext);
  const [sharedContracts, setSharedContracts] = React.useState([]);

  React.useEffect(() => {
    getSharedContracts();
    // eslint-disable-next-line
  }, [selectedContact]);

  const getSharedContracts = async () => {
    setSharedContracts(
      await Promise.all(
        selectedContact.contracts.map(async (contractId) => {
          const announce = await getAnnounce(fb, contractId);
          if (announce.data().imageURL) {
            const storedImage = await getStorageFile(
              fb,
              announce.data().imageURL
            );
            return {
              ...announce.data(),
              id: announce.id,
              imageURL: storedImage,
            };
          } else {
            return {
              id: announce.id,
              ...announce.data(),
            };
          }
        })
      )
    );
  };

  return (
    <Modal
      onCancel={() => setIsVisible(false)}
      visible={isVisible}
      footer={false}
      closable={false}
    >
      <Row gutter={16}>
        {sharedContracts.length > 0 ? (
          sharedContracts.map((sharedContract) => (
            <Col
              span={12}
              key={sharedContract.id}
              style={{ cursor: "pointer" }}
            >
              <Card
                onClick={() => history.push(`/announce/${sharedContract.id}`)}
                cover={
                  <Img
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={
                      sharedContract.imageURL
                        ? sharedContract.imageURL
                        : NotFound
                    }
                  />
                }
              >
                {sharedContract.title}
              </Card>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>
    </Modal>
  );
};

export default withRouter(ContractsModal);
