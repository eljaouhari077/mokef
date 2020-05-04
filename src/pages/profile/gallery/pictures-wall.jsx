import React from "react";
import { Upload, Button, message } from "antd";
import firebase from "firebase";
import { PlusOutlined } from "@ant-design/icons";

import { FirebaseContext } from "../../../firebase";
import { updateUserWithAdditionalInformations } from "../../../utils/dao";
import { UserContext } from "../../../contexts/user-context";
import {
  getStorageFile,
  removeStorageFile,
  addStorageFile,
} from "../../../utils/storage";
import ImagePreview from "../../../components/image-preview/image-preview";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const PicturesWall = () => {
  const fb = React.useContext(FirebaseContext);
  const { user } = React.useContext(UserContext);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [fileList, setFileList] = React.useState([]);

  React.useEffect(() => {
    updateFileListData();
    // eslint-disable-next-line
  }, []);

  const addGalleryImage = (file) => {
    addStorageFile(fb, `gallery/${file.uid}`, file.originFileObj)
      .then(() => {
        updateUserWithAdditionalInformations(fb, {
          uid: user.uid,
          "profile.gallery": firebase.firestore.FieldValue.arrayUnion(file.uid),
        }).then(() => message.success("Image uploaded successfully!"));
      })
      .catch((error) => console.error(error));
  };

  const removeGalleryImage = (file) => {
    removeStorageFile(fb, `gallery/${file.uid}`)
      .then(() => {
        updateUserWithAdditionalInformations(fb, {
          uid: user.uid,
          "profile.gallery": firebase.firestore.FieldValue.arrayRemove(
            file.uid
          ),
        }).then(() => message.success("Image deleted successfully!"));
      })
      .catch((error) => console.error(error));
  };

  const updateFileListData = () => {
    if (user.profile.gallery) {
      const imagesMap = user.profile.gallery.map((img) =>
        getStorageFile(fb, `gallery/${img}`).then((url) => {
          return {
            name: img,
            uid: img,
            status: "done",
            url: url,
          };
        })
      );

      Promise.all(imagesMap).then((res) => setFileList(res));
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ file, fileList }) => {
    if (file.status === "removed") {
      removeGalleryImage(file);
    }
    if (file.status === "done") {
      addGalleryImage(file);
    }
    setFileList(fileList);
  };
  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : (
          <Button>
            <PlusOutlined />
            Upload
          </Button>
        )}
      </Upload>

      <ImagePreview
        previewImage={previewImage}
        isVisible={previewVisible}
        setIsVisible={setPreviewVisible}
      />
    </div>
  );
};

export default PicturesWall;
