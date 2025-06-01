import { useEffect, useState } from 'react';
import { fetchMenu, generateDiets } from '../../../utils/api/dietApi';

const Menu = ({ foodId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchMenu(foodId)
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    return <div>
        {data ?
            <div
                style={{
                    border: '1px solid black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '2rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '1.5rem',
                        }}
                    >
                        {data.name}
                    </h1>
                    <p>
                        {data.calorie}kcal
                    </p>
                </div>
                <div>
                    <ul>
                        <li>
                            탄수화물 {data.carbohydrate}g
                        </li>
                        <li>
                            단백질 {data.protein}g
                        </li>
                        <li>
                            지방 {data.fat}g
                        </li>
                        <li>
                            나트륨 {data.sodium}g
                        </li>
                    </ul>
                </div>
            </div> :
            <div>
                불러오는 중...
            </div>
        }
    </div>;
};

function DietRecommend() {
    const [diets, setDiets] = useState(null);

    useEffect(() => {
        generateDiets()
            .then(diets => setDiets(diets))
            .catch(error => console.log(error));
    }, []);

    // 선택된 날
    const [selectedDayNo, setSelectedDayNo] = useState(1);

    // 삭제 버튼 클릭 시
    const handleDeleteFood = (mealIndex, foodIndex) => {
        const newDiets = { ...diets };

        delete newDiets
            .days[selectedDayNo - 1]
            .meals[mealIndex]
            .foodIds[foodIndex];

        setDiets(newDiets);
    };

    const handleAddMeals = () => {
        const newDiets = { ...diets };

        diets
            .days[selectedDayNo - 1]
            .meals
            .push({ foodIds: [] });

        setDiets(newDiets);
    };

    const handleDeleteMeals = (mealIndex) => {
        const newDiets = { ...diets };

        delete diets
            .days[selectedDayNo - 1]
            .meals[mealIndex]

        setDiets(newDiets);
    };

    return (
        <div
            style={{
                border: '1px solid black',
                padding: '2rem',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
            }}
        >
            <h1
                style={{
                    border: '1px solid black',
                    padding: '2rem',
                    textAlign: 'center',
                    fontSize: '2rem',
                }}
            >
                식단 추천 결과
            </h1>
            {diets ?
                <>
                    <div
                        style={{
                            border: '1px solid black',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            gap: '1rem',
                        }}
                    >
                        <h1
                            style={{
                                textAlign: 'center',
                                fontSize: '2rem',
                            }}
                        >
                            {selectedDayNo}일차
                        </h1>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            {diets.days[selectedDayNo - 1].meals.map(({ foodIds }, mealIndex) =>
                                <div
                                    style={{
                                        border: '1px solid black',
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                    }}
                                >
                                    {foodIds.map((foodId, foodIndex) =>
                                        <div
                                            style={{
                                                display: 'flex',
                                                marginBottom: '1rem',
                                            }}
                                            key={foodId}
                                        >
                                            <div
                                                style={{
                                                    flexGrow: 1,
                                                }}
                                            >
                                                <Menu foodId={foodId} />
                                            </div>
                                            <button
                                                style={{
                                                    marginLeft: '1rem',
                                                    alignSelf: 'center',
                                                }}
                                                onClick={() => handleDeleteFood(mealIndex, foodIndex)}
                                            >
                                                음식 제거
                                            </button>
                                        </div>,
                                    )}
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <button
                                            style={{
                                                alignSelf: 'center',
                                            }}
                                        >
                                            음식 추가
                                        </button>
                                        <button
                                            style={{
                                                alignSelf: 'center',
                                            }}
                                            onClick={() => handleDeleteMeals(mealIndex)}
                                        >
                                            식사 제거
                                        </button>
                                    </div>
                                </div>,
                            )}
                            <button
                                style={{
                                    alignSelf: 'center',
                                }}
                                onClick={() => handleAddMeals()}
                            >
                                식사 추가
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            border: '1px solid black',
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '2rem',
                            justifyContent: 'center',
                        }}
                    >
                        {diets.days.map(({ dayNo }) =>
                            <div
                                style={{
                                    border: selectedDayNo === dayNo ?
                                        '3px solid black' :
                                        '1px solid black',
                                    width: '50px',
                                    height: '50px',
                                }}
                                key={dayNo}
                                onClick={() => setSelectedDayNo(dayNo)}
                            >
                                {dayNo}일차
                            </div>,
                        )}
                    </div>
                </> :
                <div>
                    계산하는 중...
                </div>
            }
        </div>
    );
}

export default DietRecommend;