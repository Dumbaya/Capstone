import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  //날짜선택을 위한 유즈스테이트
  const [startDate, setStartDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 10));
  const [today, setToday] = useState(new Date());

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


  // 카테고리 선택 이벤트 핸들러
  const handleCategorieChange = (e) => {
    setSelectedCategorie(e.target.value);
  };

  // 카테고리 옵션 생성 (미완)
  const renderCategorieOptions = () => {
    return categories.map((category, index) => (
      <option key={index} value={category}>{category}</option>
    ));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append('registration_date', startDate.toISOString().slice(0, 19).replace('T', ' '));
    formData.append('expiration_date', expirationDate.toISOString().slice(0, 19).replace('T', ' '));
    formData.append('last_process_date', today.toISOString().slice(0, 19).replace('T', ' '));
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
              <DatePicker
                dateFormat="yyyy년 MM월 dd일"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </td>
          </tr>
          <tr>
            <td>유통기한</td>
            <td>
              <DatePicker
                dateFormat="yyyy년 MM월 dd일"
                selected={expirationDate}
                onChange={(date) => setExpirationDate(date)}
              />
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
