import { useEffect, useState } from 'react';
import styles from './BoardAddEditPage.module.css';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import buttons from 'assets/styles/common/button.module.css';
import inputs from 'assets/styles/common/input.module.css';
import textareas from 'assets/styles/common/textarea.module.css';
import errors from 'assets/styles/common/error.module.css';
import { useParams } from 'react-router-dom';

/**
 * 게시물 추가 및 수정 페이지
 */
function BoardAddEditPage() {

    const { boardId } = useParams(); //<Route path="/blog/board/addEdit/:boardId" element={<AddEditPage />} />
    const [boardData, setBoardData] = useState({
        title:'',
        category:'muscle',
        content:'',
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState({
        titleError: '',
        imageError: '',
        contentError: '',
    });

    const options = [
        { label: '근육 증진', value: 'muscle' },
        { label: '체중 감량', value: 'diet' },
        { label: '체력 증진', value: 'stamina' },
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
        if(!boardId) return;
        
        async function fetchData() {
            const data = fetchBoardDataByBoardId(boardId);
            setBoardData(data.boardData);
            setImages(data.imgList);
        }
        fetchData();
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

    const handleSubmitClick = () => {
        const isImageValid = validateImagesCount(images);
        const isTitleValid = validateTitle(boardData.title);
        const isContentValid = validateContent(boardData.content);

        if(!isImageValid || !isTitleValid || !isContentValid) return;

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

        /* 추후 사용 예정
        const url = boardId ? `/api/board/update/${boardId}` : '/api/board/create';          
        const method = boardId ? 'put' : 'post';

        async function saveBoard() {
            const response = await axios({
                method,
                url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        saveBoard();
        */

    }

    const handleCancelClick = (event) => {
        // navigate(-1)
        alert('뒤로가기!');
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
                {error.titleError.length > 0 && 
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
                                                src={URL.createObjectURL(file)}
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
                {error.imageError.length > 0 && 
                        <p className={`${errors.error}`}>{error.imageError}</p>
                }

                <textarea
                    className={`${styles.boardContent} ${textareas.textarea}`}
                    value={boardData.content}
                    onChange={contentHandler}></textarea>
                {error.contentError.length > 0 && 
                    <p className={`${errors.error}`}>{error.contentError}</p>
                }

                <div className={styles.btnContainer}>
                    <button className={`${buttons.button} ${buttons.short}`}
                        onClick={handleSubmitClick}
                    >등록</button>
                    <button className={`${buttons.button} ${buttons.short}`}
                        onClick={event => handleCancelClick(event)}
                    >취소</button>
                </div>
            </div>
        </div>
    );
}

export default BoardAddEditPage;
