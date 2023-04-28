import React, { useState } from "react";
import "./modal.css";

function Modal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Test">
      <button onClick={openModal}>모달 열기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>안녕하세요!</h2>
        <p>모달 내용입니다.</p>
      </Modal>

      <div className="modal-btn-container">
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
        <button className="modal-btn" onClick={openModal}>모달 열기</button>
      </div>
    </div>
  );
}

export default Test;
