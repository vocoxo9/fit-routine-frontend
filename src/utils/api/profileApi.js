// 로그인한 회원의 프로필 정보를 가져오는 api 함수
const getUserProfile = async () => {
    // api 함수 : TODO

    // 임시
    const result = {
            email:'example@kh.com', 
            nickname:'다이어트는 내일부터', 
            birth:'2006.06.18', 
            phone:'010-1234-5678', 
            gender:'남', 
            height:'174', 
            weight:'80',
    }

    return result;
}

export {
    getUserProfile,
};