import { useEffect, useState } from 'react';
import styles from './BoardAddEditPage.module.css';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import buttons from 'assets/styles/common/button.module.css';
import inputs from 'assets/styles/common/input.module.css';
import textareas from 'assets/styles/common/textarea.module.css';
import errors from 'assets/styles/common/error.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { saveBoard } from 'utils/api/blogApi';

/**
 * 게시물 추가 및 수정 페이지
 */

function BoardAddEditPage({
    buttonText, 
    //<Route path="/blog/board/addEdit/:boardId?" element={<AddEditPage />} />
}) {
    const {boardId} = useParams();
    const [boardData, setBoardData] = useState({
        title:'',
        category:'STRENGTH',
        content:'',
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState({
        titleError: '',
        imageError: '',
        contentError: '',
    });
  
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const options = [
        { label: '근육 증진', value: 'STRENGTH' },
        { label: '체중 감량', value: 'DIET' },
        { label: '체력 증진', value: 'ENDURANCE' },
    ];

    // 이미지 파일 개수 검증
    const validateImagesCount = (imageList) => {
        const length = imageList.length;
        if(length === 0) {
            setError(prev=> ({
                ...prev,
                imageError: '이미지를 최소 1개 첨부해주세요',
            }));
            return false;
        } else if(length > 8) {
            setImages([]);
            setError(prev=>({
                ...prev,
                imageError: '이미지는 최대 8장까지 가능합니다.',
            }));
            return false;
        } else {
            setError(prev=> ({
                ...prev,
                imageError: '',
            }));
            return true;
        }
    };

    // 제목 길이 검증
    const validateTitle = (title) => {
        const length =  title.length;
        if(length === 0) {
            setError(prev => ({
                ...prev,
                titleError: '제목을 입력해주세요',
            }));
            return false;
        } else if (length > 50) {
            setError(prev => ({
                ...prev,
                titleError: '제목은 최대 50자 이내로 작성해주세요',
            }));
            return false;
        } else {
            setError(prev => ({
                ...prev,
                titleError: '',
            }));
            return true;
        }
    }

    // 내용 길이 검증
    const validateContent = (content) => {
        const length =  content.length;
        if (length > 500) {
            setError(prev => ({
                ...prev,
                contentError: '내용은 최대 500자 이내로 작성해주세요',
            }));
            return false;
        } else {
            setError(prev => ({
                ...prev,
                contentError: '',
            }));
            return true;
        }
    }

    const fetchBoardDataByBoardId = async (boardId) => {
        // 게시물 정보 api 호출
        // const data = axios.get(...);
        // return data;
    }

    useEffect(()=>{

        async function fetchData() {
            const data = fetchBoardDataByBoardId(boardId);
            setBoardData(data.boardData);
            setImages(data.imgList);
        }
        if (boardId) {
            fetchData();
        }
        }, []);


    const titleHandler = (e) => {
        setBoardData(prev => ({
            ...prev,
            title: e.target.value,
        }));
    };

    const categoryHandler = (e) => {
        setBoardData(prev => ({
            ...prev,
            category: e.target.value,
        }));
    };

    const contentHandler = (e) => {
        setBoardData(prev => ({
            ...prev,
            content: e.target.value,
        }));
    };

    const handleSubmitClick = async () => {
        if (!validateImagesCount(images) ||
            !validateTitle(boardData.title) ||
            !validateContent(boardData.content)
        ) {
            return;
        }
        
        const formData = new FormData();

        formData.append('title', boardData.title);
        formData.append('category', boardData.category);
        formData.append('content', boardData.content);

        images.forEach((image) => {
            formData.append('images', image);
        });

        // 수정 목적일경우 boardId 추가
        if (boardId) {
            formData.append('boardId', boardId);
        }

        const result = await saveBoard(boardId, formData, 1);

        result === 'success' ? alert('추가 성공!') : alert('실패');
        navigate('/board');

    }

    return (
        <div className={styles.pageContainer}>
            <div>
                <div className={styles.formHeader}>
                    <input className={`${inputs.input} ${inputs.long} ${styles.title}`}
                        placeHolder="*제목을 입력하세요."
                        type="text"
                        value={boardData.title}
                        onChange={titleHandler}
                    />
                    <CategorySelect
                        options={options}
                        value={boardData.category}
                        onChange={categoryHandler}
                    />
                </div>
                {error.titleError && 
                        <p className={`${errors.error}`}>{error.titleError}</p>
                }

                <div className={styles.attachFile}>
                    <input
                        type="file"
                        id='fileInput'
                        multiple
                        accept='image/*'
                        className={styles.fileInputBtn}
                        onChange={e=>{setImages((Array.from(e.target.files)))}}
                    />
                    <label htmlFor="fileInput" className={`${buttons.button} ${buttons.short} ${styles.attachButton}`}>
                        파일첨부
                    </label>
                    <div className={styles.imgContainer}>
                        <table className={styles.table}>
                            <tbody>
                                {[0, 1].map(row => (
                                    <tr key={row}>
                                    {[0, 1, 2, 3].map(col => {
                                        const index = row * 4 + col;
                                        const file = images?.[index];
                                        return (
                                        <td key={col}>
                                            {file && (
                                            <img
                                                src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                                alt={`image-${index}`}
                                                className={styles.previewImg}
                                            />
                                            )}
                                        </td>
                                        );
                                    })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {error.imageError && 
                        <p className={`${errors.error}`}>{error.imageError}</p>
                }

                <textarea
                    className={`${styles.boardContent} ${textareas.textarea}`}
                    value={boardData.content}
                    onChange={contentHandler}></textarea>
                {error.contentError && 
                    <p className={`${errors.error}`}>{error.contentError}</p>
                }

                <div className={styles.btnContainer}>

                    <button 
                        type='button'
                        className={`${buttons.button} ${buttons.short}`}
                        onClick={handleSubmitClick}
                    >
                        {buttonText}
                    </button>
                    <button 
                        type='button'   // form으로 둘러쌓여 있어서
                                        // submit으로 적용되어 임시로 type='button'추가
                        className={`${buttons.button} ${buttons.short}`}
                        onClick={() => navigate(-1)}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoardAddEditPage;
