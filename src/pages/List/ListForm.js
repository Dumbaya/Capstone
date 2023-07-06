import React, { useState } from "react";
import "../../css/List.css";

function Modal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) return null;

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

function List() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(0);

  const subOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsListOpen(0);
  };
  const subOpenList = (num) => {
    setIsListOpen(num);
  };
  const openModal=(num)=>{
    subOpenModal();
    subOpenList(num);
  }


  return (
    <div className="List">
      <button onClick={()=>openModal(1)}>모달 열기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>안녕하세요!</h2>
        <p>{isListOpen}</p>
      </Modal>

      <div className="modal-btn-container">
        <button className="modal-btn" onClick={()=>openModal(1)}>모달 열기</button>
        <button className="modal-btn" onClick={()=>openModal(2)}>모달 열기</button>
        <button className="modal-btn" onClick={()=>openModal(3)}>모달 열기</button>
        <button className="modal-btn" onClick={()=>openModal(4)}>모달 열기</button>
        <button className="modal-btn" onClick={()=>openModal(5)}>모달 열기</button>
        <button className="modal-btn" onClick={()=>openModal(6)}>모달 열기</button>
        <button className="modal-btn" onClick={()=>openModal(7)}>모달 열기</button>
      </div>
    </div>
  );
}

export default List;
