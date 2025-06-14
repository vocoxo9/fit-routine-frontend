const calcTotalCalorie = (prop) => {
    let sum = 0;
    if (prop.category === 'menu') {
        prop.list.forEach((element) => {
            sum += element.calorie;
        });
    } else if (prop.category == 'exercise') {
        prop.list.forEach((element) => {
            sum += element.met;
        });
    }
    return sum;
};

const calcTotalPeriod = (startAt, endAt) => {
    const end = new Date(endAt);
    const start = new Date(startAt);
    const diff = end - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const calcDay = (date) => {
    const now = new Date();
    const day = now - date;
    return Math.floor(day / (1000 * 60 * 60 * 24));
};

const getTodayDate = () => {
    return new Date().toISOString().substring(0, 10);
};

const calcDailyBurnKcal = (weight, goalWeight, startedAt, endedAt) => {
    const DAY_DIFF = calcTotalPeriod(startedAt, endedAt);
    const TOTAL_LOSE_KCAL = (weight - goalWeight) * 7700;
    const DAILY_BURN_KCAL = Math.floor(TOTAL_LOSE_KCAL / DAY_DIFF);
    return DAILY_BURN_KCAL;
};

const calcExerciseTotalCalorie = (exerciseList, weight) => {
    const EXERCISE_TIME = 0.25;
    return exerciseList.reduce((total, exercise) => {
        return Math.round(total + exercise.met * weight * EXERCISE_TIME);
    }, 0);
};

export {
    calcTotalCalorie,
    calcTotalPeriod,
    calcDay,
    getTodayDate,
    calcDailyBurnKcal,
    calcExerciseTotalCalorie,
};
