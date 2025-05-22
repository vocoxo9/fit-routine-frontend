import './Info.css';


function Info({ kind, text, children}) {
    return (
        <>
            <div className={`mypage mypage-info ${kind}`}>
                <div className={`textBox ${kind}`}><h4 className={`h4 ${kind}`}>{text}</h4></div>
                <div className={`inputBox ${kind}`} >
                    {children}
                </div>
            </div>
        </>
    );
}

export default Info;