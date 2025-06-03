// 종료일-시작일 구하기
const getDayDiff = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays =
        Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;

    return diffInDays;
};

export { getDayDiff };
