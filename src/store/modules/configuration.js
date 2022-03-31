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
        // SETCONFIGURATION是mutation的一个方法, 本事mutation就需要带一个state固定参数再加上传入的参数
        // 此处configuration 指向configu
        /*
        SETCONFIGURATION: (state, configuration) => {
            state.githubUsername = configuration['githubUsername'] || "Huozz";
            console.log(state.githubUsername)
            // 博客首页的名字
            state.blogTitle = configuration['blogTitle'] || state.githubUsername;
            state.blogDescribe = configuration['blogDescribe'] || `欢迎来到${state.githubUsername}的个人博客`;
            // 博客浏览器页面标签的名字
            state.htmlTitle = configuration['htmlTitle'] || state.githubUsername;
            // 字体颜色
            state.fontColor = configuration['fontColor'] || '#ffffff';
            // 首页背景是否使用图片
            state.useBackgroundImage = configuration['useBackgroundImage'] || false;
            // 首页背景渐变颜色1
            state.backgroundColorLeft = configuration['backgroundColorLeft'] || '#155799';
            // 首页背景渐变颜色2
            state.backgroundColorRight = configuration['backgroundColorRight'] || '#159957';
            // 播放器播放音乐链接
            state.audioUrl = configuration['audioUrl'] || '';
            // mini
            state.mini = configuration['mini'] || false;
            // 播放器是否自动播放
            state.audioAutoPlay = configuration['audioAutoPlay'] || false;
            // website
            state.webSites = configuration['webSites'] || [] ;
            state.location = configuration['location'] || '';
        }
        */

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
            let xmlhttp;
            // if(window.XMLHttpRequest){
            //     xmlhttp = new XMLHttpRequest();
            // }
            // else{
            //     xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            // }
            // // open 方法的三个参数: method, url, async(是否异步)

            
            // xmlhttp.open("GET","../../../assets/configuration.json",false);
            // // 发送http请求
            // xmlhttp.send();
            // console.log(xmlhttp.responseText);
            // // JSON将返回的JSON解析为对象
            // let configuration = JSON.parse(xmlhttp.responseText);
            // // 将获取到的configuration作为参数 交给mutation 对数据进行修改
            // context.commit('SETCONFIGURATION', configuration);
            context.commit('SETCONFIGURATION');

        }
    }
}

export default configuration