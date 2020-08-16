import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";

const FileUpload = (props) => {
  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        console.log("frontend /product/image", res.data);
        setImages([...images, res.data.filePath]);
        props.refreshFunc([...images, res.data.filePath]);
      } else {
        alert("fail to upload image");
      }
    });
  };

  const onDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunc(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              onDelete(item);
            }}
          >
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${item}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
