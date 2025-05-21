import styles from './BlogGrade.module.css';

/**
 * 
 * @param {grade} 블로그 점수값
 * @returns 
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