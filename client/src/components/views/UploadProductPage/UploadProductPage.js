import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Austrailia" },
  { key: 7, value: "Antarctica" },
];

const UploadProductPage = (props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);
  const [images, setImages] = useState([]);

  const onChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  const onChangeDesc = (e) => {
    setDesc(e.currentTarget.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.currentTarget.value);
  };
  const onChangeContinent = (e) => {
    setContinent(e.currentTarget.value);
  };

  const updateImage = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc || !price || !continent || !images) {
      console.log(name, desc, price, continent, images);
      return alert("fill every value");
    }

    const body = {
      writer: props.user.userData._id,
      title: name,
      description: desc,
      price: price,
      images: images,
      continent: continent,
    };

    Axios.post("/api/product", body).then((res) => {
      if (res.data.success) {
        alert("success to upload");
        props.history.push("/");
      } else {
        alert("fail to upload");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>여행 샘플 업로드</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* {Dropzone} */}
        <FileUpload refreshFunc={updateImage} />
        <br />
        <br />
        <label>이름</label>
        <Input value={name} onChange={onChangeName} />
        <br />
        <br />
        <label>설명</label>
        <TextArea value={desc} onChange={onChangeDesc} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" value={price} onChange={onChangePrice} />
        <br />
        <br />
        <select onChange={onChangeContinent}>
          {continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={onSubmit}>
          확인
        </Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
