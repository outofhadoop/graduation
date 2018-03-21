export default {
    state:{
        loginState: false,
        userInfo: {
            username : '',
            password: '',
            headImgUrl: 'http://localhost:3000/image',
            loginTime: ''
        }
    },
    mutations: {
        login (state) {
            state.loginState = true;
        },
        logout (state) {
            state.loginState = false;
        },
        setUserInfo (state, payload) {
            state.userInfo.username = payload.username
            state.userInfo.password = payload.password
            state.userInfo.headImgUrl = payload.headImgUrl == '' ? 'http://localhost:3000/image/user.png' : payload.headImgUrl
        }
    },
    action: {
        login (context) {
            context.commit('login')
        }
    }
}