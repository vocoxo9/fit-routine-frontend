import Button from 'components/common/Button/Button';
import styles from './FormContent.module.css';

const FormContent = ({children}) => {

    return (
        <div className={styles.formBox}>
            {children}
            <Button size="long" text="다음"></Button>
        </div>
    );

};

export default FormContent;