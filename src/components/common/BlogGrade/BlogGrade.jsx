import styles from './BlogGrade.module.css';

/**
 * 블로그 등급 컴포넌트
 *
 * @param {number} grade 블로그 점수값
 * @returns 점수에 따른 문자 형태 ex) S, A
 */
function BlogGrade({ grade }) {

    const getGradeLetter = (grade) => {
        if (grade >= 500) return 'SS';
        if (grade >= 100) return 'S';
        if (grade >= 50) return 'A';
        if (grade >= 20) return 'B';
        return 'C';
    };

    return (
        <div className={styles.letter}>
            {getGradeLetter(grade)}
        </div>
    );
}


export default BlogGrade;