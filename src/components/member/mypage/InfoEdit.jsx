import Info from 'components/common/Info/Info';
import styles from './InfoEdit.module.css';

function InfoEdit() {
    return (
        <>
            <div className={styles.subTitle}>정보 수정</div>
            <div className={styles.table}>
                <Info kind="nickName" text="닉네임">
                    <input
                        size="long"
                        type="text"
                        id="nickname"
                        name="nickname"
                    />
                </Info>
                <Info kind="password" text="비밀번호">
                    <input
                        label="기존 비밀번호"
                        size="long"
                        type="password"
                        id="pwd"
                        name="pwd"
                    />
                    <input
                        label="새 비밀번호"
                        size="long"
                        type="password"
                        id="newPwd"
                        name="newPwd"
                        readOnly={true}
                    />
                    <input
                        label="비밀번호 확인"
                        size="long"
                        type="password"
                        id="checkPwd"
                        name="checkPwd"
                        readOnly={true}
                    />
                </Info>
                <Info kind="phone" text="휴대폰">
                    <input size="short" type="number" id="phone" name="phone" />
                    <input size="short" type="number" id="phone" name="phone" />
                    <input size="short" type="number" id="phone" name="phone" />
                </Info>
                <Info kind="body" text="신장/체중">
                    <div className={styles.body}>
                        <input
                            label="신장"
                            size="short"
                            type="number"
                            id="height"
                            name="height"
                        />
                        <p className={styles.p}>cm</p>
                    </div>
                    <div className={styles.body}>
                        <input
                            label="체중"
                            size="short"
                            type="number"
                            id="weight"
                            name="weight"
                        />
                        <p className={styles.p}>kg</p>
                    </div>
                </Info>
            </div>
            <div className={styles.btnArea}>
                <div className={styles.btn}>
                    <button size="short" text="수정" />
                    <button size="short" text="취소" />
                </div>
            </div>
        </>
    );
}

export default InfoEdit;
