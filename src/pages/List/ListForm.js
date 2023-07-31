import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/List.css";
import Submit from "./Submit";

import Head from '../HeadContainer';

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
  // 모달 오픈을 위한 유즈스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(0);
  //
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
  const openModal = (num) => {
    subOpenModal();
    subOpenList(num);
  }

  const openDays=()=>{
    return(
      <div className="openDays">
        100000000000000000
      </div>
    );
  }

  return (
    <div className="List_container">
      <Head/>
      <div className="List">
        <button onClick={() => openModal(1)}>모달 열기</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Submit num={isListOpen} />
          <p>{isListOpen}</p>
        </Modal>
        
        <div className="modal-btn-container">
          <div className="btn-box">
            <button className="modal-btn" onClick={() => openModal(1)}>모달 열기</button>
            <div className="openDays">
              10000
            </div>
          </div>

          <button className="modal-btn" onClick={() => openModal(2)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(3)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(4)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(5)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(6)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(7)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(8)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(9)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(10)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(11)}>모달 열기</button>
          <button className="modal-btn" onClick={() => openModal(12)}>모달 열기</button>
        </div>
      </div>
    </div>
  );
}

export default List;
