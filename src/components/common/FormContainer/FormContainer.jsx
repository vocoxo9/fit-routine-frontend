import styles from './FormContainer.module.css';

/**
 *
 * @children FormContainer 자식 요소
 * @style  FormContainer 스타일 ['common : 기본스타일', 'short']
 * @returns
 */
const FormContainer = (
    {
        children,
        style = 'common',
    },
) => {

    return (
        <div className={styles[`${style}`]}>
            {children}
        </div>
    );
};

export default FormContainer;