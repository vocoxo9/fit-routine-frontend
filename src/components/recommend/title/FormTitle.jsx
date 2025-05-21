import styles from './FormTitle.module.css';

export default function FormTitle({text}){

    return (
        <div className={styles.formTitle}>
            {text}
        </div>
    );

};