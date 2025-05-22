import styles from './CategorySelect.module.css';


/**
 * 
 * @param {string[]} options[] 옵션으로 설정할 이름들 { label:표시할 옵션명, value:데이터명 }
 * @param {object} value 선택된 select 값 (부모 컴포넌트에서 e.target.value로 값을 보내줘야함)
 * @param {function} onChange 상태가 바뀔시 호출할 함수 ex) api요청으로 게시물 변경, 단순 select의 value값 변경
 *  
 */
export default function CategorySelect(
    {
        options = [],
        value,
        onChange
    }
) {

    return (
        <select className={styles.select} value={value} onChange={onChange}>
            {
                options.map((option) => {
                    return(
                    <option key={option.value} value={option.value}>{option.label}</option>
                    )
                })
            }
        </select>
    )
}