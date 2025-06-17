import DietRecommend from 'components/recommend/diet/DietRecommend/DietRecommend';

function RecommendDiet(
    {
        goToNext,
        dayRepeat
    },
) {
    return (
        <DietRecommend
            goToNext={goToNext}
            dayRepeat={dayRepeat}
        />
    );
}

export default RecommendDiet;