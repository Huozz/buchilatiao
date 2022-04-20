const configuration ={
    state:{
        githubUsername: "Huozz",
        blogTitle: "",
        blogDescribe: "",
        htmlTitle: "",
        fontColor: "",
        useBackgroundImage: false,
        backgroundColorLeft: "",
        backgroundColorRight: "",
        audioUrl: "",
        mini: false,
        audioAutoPlay:false,
        webSites:[],
        location: "广州",
        avatarUrl: '../../../assets/kuluomi.jpg'
    },
    mutations:{
        SETCONFIGURATION: (state) => {
            state.githubUsername =  "Huozz";
            console.log(state.githubUsername)
            // 博客首页的名字
            state.blogTitle =  state.githubUsername;
            state.blogDescribe =  `欢迎来到${state.githubUsername}的个人博客`;
            // 博客浏览器页面标签的名字
            state.htmlTitle =  state.githubUsername;
            // 字体颜色
            state.fontColor = '#ffffff';
            // 首页背景是否使用图片
            state.useBackgroundImage =  false;
            // 首页背景渐变颜色1
            state.backgroundColorLeft = '#155799';
            // 首页背景渐变颜色2
            state.backgroundColorRight =  '#159957';
            // 播放器播放音乐链接
            state.audioUrl =  '';
            // mini
            state.mini =  false;
            // 播放器是否自动播放
            state.audioAutoPlay =  false;
            // website
            state.webSites =  [] ;
            state.location =  '广州';
        }
    },
    actions:{
        // Init({commit}){
        Init(context){
            context.commit('SETCONFIGURATION');
        }
    }
}

export default configuration