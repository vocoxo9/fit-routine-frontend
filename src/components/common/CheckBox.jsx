import '../css/checkBox.css';

function CheckBox({name, text}) {
    return (
        <div className='checkBox'>
            <label htmlFor={text}>{text}</label>
            <input type="checkbox" name={name} id={text} />
        </div>
    );
}

export default CheckBox;