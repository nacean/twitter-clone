import React from "react";
import { Modal } from "react-bootstrap";

function ImgMordal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ background: "none" }}
    >
      <img src={props.imgsrc} alt="bigShow" />
    </Modal>
  );
}

export default ImgMordal;
