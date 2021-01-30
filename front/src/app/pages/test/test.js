import React from "react";
import ImageSelector from "../../domains/image/components/image-selector/image-selector";

const Test = () => (
  <main>
    <ImageSelector imageType="buildBase" initialValue={{ key: "gorsevalTheMultifarious", type: "boss" }} />
  </main>
);

export default Test;
