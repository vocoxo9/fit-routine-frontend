import { useEffect, useState } from 'react';
import { fetchMenu, generateDiets, fetchFoodsByCategory } from 'utils/api/dietApi';
import buttonStyles from 'assets/styles/common/button.module.css';

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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '2rem',

                    border: '1px solid #081f5c',
                    borderRadius: '0.5rem',
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

const AddFoodModal = ({ isOpen, onClose, onAddFood }) => {
    const [selectedCategory, setSelectedCategory] = useState('밥');
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setLoading(true);
        fetchFoodsByCategory(selectedCategory)
            .then(data => {
                setFoods(data);
                setLoading(false);
            })
            .catch(error => console.log(error));

    }, [isOpen, selectedCategory]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    width: '80%',
                    maxWidth: '720px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>음식 추가</h2>

                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    {['밥', '국', '반찬'].map((category) => (
                        <button
                            key={category}
                            className={`${buttonStyles.button} ${buttonStyles.short}`}
                            style={{
                                padding: '0.5rem 1rem',
                            }}
                            disabled={selectedCategory === category}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {loading ? (
                        <p>불러오는 중...</p>
                    ) : foods.length === 0 ? (
                        <p>음식이 없습니다.</p>
                    ) : (
                        foods.map((data) => (
                            <div
                                key={data.menuId}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        flexGrow: 1,
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
                                </div>
                                <button
                                    className={`${buttonStyles.button} ${buttonStyles.short}`}
                                    style={{
                                        marginLeft: '1rem',
                                    }}
                                    onClick={() => onAddFood(data.menuId)}
                                >
                                    추가
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

function DietRecommend() {
    const [diets, setDiets] = useState(null);

    useEffect(() => {
        generateDiets()
            .then(diets => setDiets(diets))
            .catch(error => console.log(error));
    }, []);

    // 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMealIndex, setCurrentMealIndex] = useState(null);

    // 모달 열기 (특정 식사에 추가)
    const openAddFoodModal = (mealIndex) => {
        setCurrentMealIndex(mealIndex);
        setIsModalOpen(true);
    };

    // 선택된 날
    const [selectedDayNo, setSelectedDayNo] = useState(1);

    // 음식 추가 핸들러
    const handleAddFood = (foodId) => {
        const newDiets = { ...diets };
        newDiets.days[selectedDayNo - 1]
            .meals[currentMealIndex]
            .foodIds.push(foodId);

        setDiets(newDiets);
        setIsModalOpen(false);
    };

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
            .meals[mealIndex];

        setDiets(newDiets);
    };

    return (
        <div
            style={{
                padding: '2rem',
                alignItems: 'stretch',
                gap: '2rem',

                border: '1px solid #081f5c',
                borderRadius: '0.5rem',
                boxShadow: "0 16px 48px rgb(0, 0, 0, 0.1)",
            }}
        >
            <h1
                style={{
                    textAlign: 'center',

                    color: '#334eac',
                    fontSize: '2.0rem',
                    fontWeight: '600',
                    padding: '2.5rem'
                }}
            >
                식단 추천 결과
            </h1>
            {diets ?
                <>
                    <AddFoodModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddFood={handleAddFood}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            gap: '1rem',

                            border: '1px solid #081f5c',
                            borderRadius: '0.5rem',
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
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',

                                        border: '1px solid #081f5c',
                                        borderRadius: '0.5rem',
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
                                                className={`${buttonStyles.button} ${buttonStyles.short}`}
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
                                            gap: '1rem',
                                        }}
                                    >
                                        <button
                                            style={{
                                                alignSelf: 'center',
                                            }}
                                            className={`${buttonStyles.button} ${buttonStyles.short}`}
                                            onClick={() => openAddFoodModal(mealIndex)}
                                        >
                                            음식 추가
                                        </button>
                                        <button
                                            style={{
                                                alignSelf: 'center',
                                            }}
                                            className={`${buttonStyles.button} ${buttonStyles.short}`}
                                            onClick={() => handleDeleteMeals(mealIndex)}
                                        >
                                            식사 제거
                                        </button>
                                    </div>
                                </div>,
                            )}
                            <button
                                className={`${buttonStyles.button} ${buttonStyles.short}`}
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
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '1rem 2rem',
                            marginTop: '2rem',
                            justifyContent: 'center',
                        }}
                    >
                        {diets.days.map(({ dayNo }) =>
                            <div
                                style={{
                                    border: selectedDayNo === dayNo ?
                                        '3px solid black' :
                                        '1px solid black',
                                    width: '75px',
                                    height: '75px',
                                }}
                                key={dayNo}
                                onClick={() => setSelectedDayNo(dayNo)}
                            >
                                {dayNo}일차
                            </div>,
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '2rem',
                            justifyContent: 'center',
                        }}
                    >
                        <button
                            className={`${buttonStyles.button} ${buttonStyles.long}`}
                        >
                            TO-DO에 추가
                        </button>
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