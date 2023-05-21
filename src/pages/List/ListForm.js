import React, { useState, useEffect } from "react";
import axios from 'axios';
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
        <Submit num={isListOpen} />
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

function Submit(props) {

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
  //유통기한을 위한 유즈스테이트
  const [expirationYear, setExpirationYear] = useState(getCurrentYear());
  const [expirationMonth, setExpirationMonth] = useState(getCurrentMonth());
  const [expirationDay, setExpirationDay] = useState(getCurrentDate());
  //카테고리선택을 위한 유즈스테이트
  const [selectedCategorie, setSelectedCategorie] = useState('카테고리');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
  const handleCategorieChange = (e) => {
    setSelectedCategorie(e.target.value);
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
  const renderCategorieOptions = () => {
    return categories.map((category, index) => (
      <option key={index} value={category}>{category}</option>
    ));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = selectedYear.toString();
    const month = selectedMonth.toString().padStart(2, '0');
    const day = selectedDay.toString().padStart(2, '0');
    const selectedDate = `${year}-${month}-${day}`;

    const formData = new FormData(e.target);
    

    const e_year = expirationYear.toString();
    const e_month = expirationMonth.toString().padStart(2, '0');
    const e_day = expirationDay.toString().padStart(2, '0');
    const e_selectedDate = `${e_year}-${e_month}-${e_day}`;

    formData.append('registration_date', selectedDate);
    formData.append('expiration_date', e_selectedDate);
    formData.append('last_process_date', "00-00-00");
    formData.append('size', "미정");
    formData.append('image', "미정");
    formData.append('user_board_number', props.num);

    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        'http://localhost:3002/user_food_resources',
        formValues
      );

      // 서버 응답 처리
      if (response.status === 200) {
        console.log('폼 제출 성공');
      } else {
        console.error('폼 제출 실패');
      }
    } catch (error) {
      console.error('폼 제출 오류', error);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      {props.num}
      <h3>상태 : <input type="text" name="state" /></h3>
      <table>
        <tbody>
          <tr>
            <td>마지막수정일</td>
            <td>년. 월. 일</td>
          </tr>
          <tr>
            <td>이름 : </td>
            <td>
              <input type="text" name="food_resource_id" />
            </td>
          </tr>
          <tr>
            <td>소유자 : </td>
            <td>
              <input type="text" name="user_id" />
            </td>
          </tr>
          <tr>
            <td>카테고리</td>
            <td>
              <select
                name="selectedCategorie"
                value={selectedCategorie}
                onChange={handleCategorieChange}
              >
                {renderCategorieOptions()}
              </select>
            </td>
          </tr>
          <tr>
            <td>보관일</td>
            <td>
              <select
                name="selectedYear"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {renderYearOptions()}
              </select>
              년&nbsp;
              <select
                name="selectedMonth"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {renderMonthOptions()}
              </select>
              월&nbsp;
              <select
                name="selectedDay"
                value={selectedDay}
                onChange={handleDayChange}
              >
                {renderDayOptions()}
              </select>
              일
            </td>
          </tr>
          <tr>
            <td>유통기한</td>
            <td>
              <select
                name="expiration_year"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {renderYearOptions()}
              </select>
              년&nbsp;
              <select
                name="expiration_month"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {renderMonthOptions()}
              </select>
              월&nbsp;
              <select
                name="expiration_day"
                value={selectedDay}
                onChange={handleDayChange}
              >
                {renderDayOptions()}
              </select>
              일
            </td>
          </tr>
          <tr>
            <td>사진</td>
          </tr>
        </tbody>
      </table>
      <button type="submit">저장</button>
    </form>
  );
}

export default List;
