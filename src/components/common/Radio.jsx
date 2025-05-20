import '../css/Radio.css';


function Radio({id, text, name}) {
    return (
        <div className='radio'>
            <label for={id}>{text}</label>
            <input type="radio" id={id} name={name} />
        </div>
    );
}
export default Radio;