import '../css/category.css';
import catImage from "../assests/img/고양이 예시.png";

function Category({size}) {
    return (
        <>
            <div className={`category ${size}`}>
                <div className='img'>
                    <img src={catImage} alt="카테고리 이미지" />
                </div>
                <div className='text'>
                    텍스트
                </div>
            </div>
            <br />
        </>
    );
}

export default Category;