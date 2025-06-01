const generateDiets = async () => {
    // 임시 API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        days: [
            {
                dayNo: 1,
                meals: [
                    { foodIds: [415, 6619, 872] },
                    { foodIds: [217, 5490, 555] },
                    { foodIds: [317, 113, 115] },
                ],
            },
            {
                dayNo: 2,
                meals: [
                    { foodIds: [153, 7041, 301] },
                    { foodIds: [888, 999, 422] },
                    { foodIds: [341, 71, 3611] },
                ],
            },
        ],
    };
};

const fetchMenu = async (menuId) => {
    // 임시 API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        name: '샌드위치',
        calorie: 30,
        carbohydrate: 10,
        protein: 10,
        fat: 10,
        sodium: 10,
    };
};

const fetchCategory = async (category, page, pageSize) => {
    // 임시 API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return new Array(pageSize).fill(0).map(() => ({
        name: '샌드위치',
        calorie: 30,
        carbohydrate: 10,
        protein: 10,
        fat: 10,
        sodium: 10,
    }));
};

export { generateDiets, fetchMenu };
