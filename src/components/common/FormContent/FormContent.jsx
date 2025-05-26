import styles from './FormContent.module.css';

const FormContent = ({children}) => {
    return (
        <div className={styles.formBox}>
            {children}
        </div>
    );

};

export default FormContent;