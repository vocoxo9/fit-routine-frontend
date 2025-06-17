import { useEffect, useState } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import styles from './BoardAddEditPage.module.css';
import CategorySelect from 'components/blog/CategorySelect/CategorySelect';
import buttons from 'assets/styles/common/button.module.css';
import inputs from 'assets/styles/common/input.module.css';
import textareas from 'assets/styles/common/textarea.module.css';
import errors from 'assets/styles/common/error.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, deleteImage, editPost, getBlogDetailByToken, getPostDetailByPostId, getPostImagesByPostId, saveImage } from 'utils/api/blogApi';

/**
 * 게시물 추가 및 수정 페이지
 */

function BoardAddEditPage({
    buttonText, 
}) {
    const {boardId} = useParams();
    const [boardData, setBoardData] = useState({
        title:'',
        category:'ALL',
        content:'',
    });
    const [images, setImages] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [error, setError] = useState({
        titleError: '',
        imageError: '',
        contentError: '',
    });
  
    const navigate = useNavigate();

    const options = [
        { label: '자유', value: 'ALL' },
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

    const fetchBoardDetail = async (boardId) => {
        const data = await getPostDetailByPostId(boardId);
        const imageList = await getPostImagesByPostId(boardId);

        setBoardData({
            title: data.title,
            category: data.category,
            content: data.content,
        });
        setImages(imageList);
    }

    useEffect(()=>{
        if (boardId) {
            fetchBoardDetail(boardId);
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

        const blogId = await getBlogDetailByToken();
        
        const payload = {
            title: boardData.title,
            content: boardData.content,
            category: boardData.category,
        }

        const data = boardId ? await editPost(boardId, payload) : await createPost(blogId.blogId, payload);
        

        images.forEach(async (image) => {
            if (image instanceof File){
                await saveImage(data.postId,image);
            }
        });

        if(boardId) {
            deletedImageIds.forEach(async (id) => {
                await deleteImage(id);
            });
        }

        navigate('/board');
    }

    const handleRemoveImage = (index) => {
        const target = images[index];

        // 이미지가 기존 이미지일 경우 (서버에 있던 것)
        if (!(target instanceof File)) {
            setDeletedImageIds(previous => [...previous, target.imageId]);
        }
        
        setImages(previous => previous.filter((_, i) => i !== index));
    };

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
                        onChange={(event) => {
                            const newFiles = Array.from(event.target.files);

                            setImages(previous => {
                                const updateImages = [...previous, ...newFiles];
                                return updateImages.slice(0, 8);
                            });
                            
                        }}
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
                                            {file !== undefined && (
                                            <>
                                                <div className={styles.cancel} onClick={() => handleRemoveImage(index)}><MdCancelPresentation/></div>
                                                <img
                                                    src={file instanceof File ? URL.createObjectURL(file) : `${process.env.REACT_APP_IMAGE_BASE_URL}${file.changeName}`}
                                                    alt={`image-${index}`}
                                                    
                                                    className={styles.previewImg}
                                                />
                                            </>
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
                        onClick={() => {
                            console.log(images);
                            
                            navigate(-1);
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoardAddEditPage;