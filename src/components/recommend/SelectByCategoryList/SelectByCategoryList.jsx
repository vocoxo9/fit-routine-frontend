import CheckBox from 'components/common/CheckBox/CheckBox';
import styles from './SelectByCategoryList.module.css';

const SelectByCategoryList = ({
    dayNo,
    categoryExercises,
    checked,
onChange}) => {
    return (
        <div className={styles.selectedByCategory}>
            {categoryExercises.map((exercise) => (
                <CheckBox
                    key={`selected_${dayNo}_${exercise.id}`}
                    id={`${dayNo}_${exercise.id}`}
                    name={exercise.name}
                    label={exercise.label}
                    checked={checked.some((e) => e.id === exercise.id)}
                    onChange={() => onChange(exercise)}
                    styleType='category'
                />
            ))}
        </div>
    );
};

export default SelectByCategoryList;
