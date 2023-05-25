import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/List.css";



function Waiting(props) {

    //날짜선택을 위한 유즈스테이트
    const [startDate, setStartDate] = useState(new Date());
    const [expirationDate, setExpirationDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 10));
    const [today, setToday] = useState(new Date());


    //카테고리선택을 위한 유즈스테이트
    const [selectedCategorie, setSelectedCategorie] = useState([]);//여기에는 선택된 카테고리의 아이디값만 들어감
    const [selectedSubCategorie, setSubSelectedCategorie] = useState([]);//여기에는 선택된 카테고리의 아이디값만 들어감
    const [categories, setCategories] = useState([]);//데이터 여러개 그자체가 들어감
    const [subCategories, setSubCategories] = useState([]);//데이터 여러개 그자체가 들어감

    

    //카테고리 유즈이펙
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3002/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);
    // 서브 카테고리 유즈이펙

    useEffect(() => {
        const fetchSubCategories = async (categoryId) => {
            try {
                const response = await axios.get(`http://localhost:3002/food_resources?category_id=${categoryId}`);
                setSubCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };


        fetchSubCategories(selectedCategorie);

    }, [selectedCategorie]);



    //카테고리 선택 이벤트 핸들러
    const handleCategorieChange = (categoryId) => {
        if (categoryId!='0'){
            setSelectedCategorie(categoryId);
        }
        
    };
    // 카테고리 옵션 생성
    const renderCategorieOptions = () => {
        return categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
        ));
    };

    // 서브카테고리 선택 이벤트 핸들러
    const handleSubCategorieChange = (categoryId) => {
        if(categoryId!='0'){
            setSubSelectedCategorie(categoryId);
        const days = parseInt(subCategories.find(item => item.id == categoryId)?.recommended_shelf_life);
        //여기에 날짜 변경 추가
        setExpirationDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + days));
        }
        
    };
    // 서브 카테고리 옵션 생성
    const renderSubCategorieOptions = () => {
        return subCategories.map((subCategory) => (
            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
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

    const food_name = subCategories.find(item => item.id == selectedSubCategorie)?.name;
    const asd=sessionStorage.getItem('username');
        return (
            <form className="input-form" onSubmit={handleSubmit}>
                {props.num}
                {asd}
                <h3>상태 : <input type="text" name="state" value="입력대기" readOnly /></h3>
                <table>
                    <tbody>
                        {categories.id}
                        <tr>
                            <td>마지막수정일</td>
                            <td>년. 월. 일</td>
                        </tr>
                        <tr>
                            <td>이름 : </td>
                            <td>
                                <input type="text" name="food_name" value={food_name} />
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
                                    value={selectedCategorie.name}
                                    onChange={(e) => handleCategorieChange(e.target.value)}
                                >
                                    <option key={0} value={0}>없음</option>
                                    {renderCategorieOptions()}
                                </select>
                                <select
                                    name="selectedSubCategorie"
                                    value={selectedSubCategorie.name}
                                    onChange={(e) => handleSubCategorieChange(e.target.value)}
                                >
                                    <option key={0} value={0}>선택</option>
                                    {renderSubCategorieOptions()}
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

export default Waiting;
