// 将configuration, users中的属性都写入getter中方便获取
// 本身getter的参数就是
const getters = {
    token: state => state.token.token,
    githubUsername: state => state.configuration.githubUsername,
    blogTitle: state => state.configuration.blogTitle,
    blogDescribe: state => state.configuration.blogDescribe,
    htmlTitle: state => state.configuration.htmlTitle,
    fontColor: state => state.configuration.fontColor,
    useBackgroundImage: state => state.configuration.useBackgroundImage,
    backgroundColorLeft: state => state.configuration.backgroundColorLeft,
    backgroundColorRight: state => state.configuration.backgroundColorRight,
    audioUrl: state => state.configuration.audioUrl,
    mini: state => state.configuration.mini,
    webSites: state => state.configuration.webSites,
    avatarUrl: state => state.configuration.avatarUrl,
    name: state => state.users.name,
    location: state => state.configuration.location,
    blog: state => state.users.blog,
    followersTotal: state => state.users.followers,
    followingTotal: state => state.users.following
}
export default getters