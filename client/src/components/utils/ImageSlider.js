import React from "react";
import { Carousel } from "antd";

const ImageSlider = (props) => {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => {
          return (
            <div key={index}>
              <img
                style={{ width: "100%", maxHeight: "100%" }}
                src={`http://localhost:5000/${image}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
