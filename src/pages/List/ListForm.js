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
  // 모달 오픈을 위한 유즈스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(0);
  
  const date = new Date();
  // 현재 연도 가져오기
  const getCurrentYear = () => {
    return date.getFullYear();
  };
  // 현재 월 가져오기
  const getCurrentMonth = () => {
    return date.getMonth() + 1;
  };
  // 현재 일 가져오기
  const getCurrentDate = () => {
    return date.getDate();
  };
  //날짜선택을 위한 유즈스테이트
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedDay, setSelectedDay] = useState(getCurrentDate());
  //카테고리선택을 위한 유즈스테이트
  const [selectedKategorie, setSelectedKategorie] = useState('카테고리');
  

  // 년도 선택 이벤트 핸들러
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // 월 선택 이벤트 핸들러
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // 일 선택 이벤트 핸들러
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  // 카테고리 선택 이벤트 핸들러
  const handleKategorieChange = (e) => {
    setSelectedKategorie(e.target.value);
  };

  

  // 년도 선택 옵션 생성
  const renderYearOptions = () => {
    const currentYear = getCurrentYear();
    const startYear = currentYear - 20; // 20년 전부터 선택 가능하도록 설정
    const endYear = currentYear;
    const options = [];

    for (let year = startYear; year <= endYear; year++) {
      options.push(<option key={year} value={year}>{year}</option>);
    }

    return options;
  };

  // 월 선택 옵션 생성
  const renderMonthOptions = () => {
    const options = [];

    for (let month = 1; month <= 12; month++) {
      options.push(<option key={month} value={month}>{month}</option>);
    }

    return options;
  };

  // 일 선택 옵션 생성
  const renderDayOptions = () => {
    const options = [];

    for (let day = 1; day <= 31; day++) {
      options.push(<option key={day} value={day}>{day}</option>);
    }

    return options;
  };

  // 카테고리 옵션 생성 (미완)
  const renderKategorieOptions = () => {
    const options = [];

    options.push(<option key={32} value="카테고리">카테고리</option>)

    for (let day = 1; day <= 31; day++) {//여기 수정해서 카테고리 불러오게해야함
      options.push(<option key={day} value={day}>{day}</option>);
    }

    return options;
  };

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

  return (
    <div className="List">
      <button onClick={() => openModal(1)}>모달 열기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>안녕하세요!</h2>
        <div>
          카테고리
          <select value={selectedKategorie} onChange={handleKategorieChange}>
            {renderKategorieOptions()}
          </select>
        </div>
        <div>
          <select value={selectedYear} onChange={handleYearChange}>
            {renderYearOptions()}
          </select>년&nbsp;
          <select value={selectedMonth} onChange={handleMonthChange}>
            {renderMonthOptions()}
          </select>월&nbsp;
          <select value={selectedDay} onChange={handleDayChange}>
            {renderDayOptions()}
          </select>일&nbsp;
        </div>
        <p>{isListOpen}</p>
      </Modal>

      <div className="modal-btn-container">
        <button className="modal-btn" onClick={() => openModal(1)}>모달 열기</button>
        <button className="modal-btn" onClick={() => openModal(2)}>모달 열기</button>
        <button className="modal-btn" onClick={() => openModal(3)}>모달 열기</button>
        <button className="modal-btn" onClick={() => openModal(4)}>모달 열기</button>
        <button className="modal-btn" onClick={() => openModal(5)}>모달 열기</button>
        <button className="modal-btn" onClick={() => openModal(6)}>모달 열기</button>
        <button className="modal-btn" onClick={() => openModal(7)}>모달 열기</button>
      </div>
    </div>
  );
}

export default List;
