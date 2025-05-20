import '../css/Button.css';

function Button ({size, text}) {
    return (
        <>
            <button className={`btn ${size}`}>
                {text}
            </button>
        </>
    );
}

export default Button;