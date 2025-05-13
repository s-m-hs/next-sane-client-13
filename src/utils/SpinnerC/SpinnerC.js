"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { PuffLoader, ScaleLoader } from "react-spinners";

export default function SpinnerC() {
  return (
    <Modal size="lg">
      <Modal.Body style={{ fontSize: "35px" }}>
        <div>
          <ScaleLoader
          // color="rgba(25, 165, 175)"
          // size="250px"
          // speedMultiplier={1}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
