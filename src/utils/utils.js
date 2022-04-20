import request from './request'
export default {
    // 生成随机位置音符时使用，输入起始和终止，返回这个区间内的随机数
    randomInt(s,e){
      let d = e - s;
      if(d<0) return s;
      else{
          let r = Math.random() * d + s;
          r = parseInt(r,10)
          return r
        }
      
    },
    // 点击全屏时触发
    fullScreen(){
        // 做兼容性操作
        var element = document.documentElement
        // 判断是否支持ActiveXObject控件,执行操作是element.requestFullscreen()
        if(window.ActiveXObject) {
            // 使用ActiveXObject控件调用本地程序
            var WsShell = new ActiveXObject('WScript.Shell')
            WsShell.SendKeys('{F11}')
        // 判断该浏览器是否具有requestFullscreen方法
        } else if(element.requestFullscreen){
            element.requestFullscreen()
        // IE浏览器
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen()
        // 谷歌/苹果浏览器
        } else if(element.webkitRequestFullscreen){
            element.webkitRequestFullscreen()
        // 火狐浏览器
        } else if(element.mosRequestFullscreen){
            element.mosRequestFullscreen();
        }
    },
    fullExit(){
        var element  = document.documentElement
        // 判断是否支持用element.request
        if(window.ActiveXObject){
            var WsShell = new ActiveXObject('WScript.Shell')
            WsShell.SendKeys('{F11}')
        }else if(element.requestFullscreen){
            document.exitFullscreen()
        }else if(element.msrequestFullscreen){
            document.msExitFullscreen()
        // 注意谷歌苹果的是cancelFullScreen, cancel, Screen的s大写
        }else if(element.webkitRequestFullscreen){
            document.webkitCancelFullScreen()
        // 注意火狐的是cancelFull
        } else if(element.mozRequestFullScreen){
            document.mozCancelFullScreen()
        }
    },
    // 结果有多页时的处理， 返回总页数
    parseHeaders(headers){
        try {
            // 多个链接之间用逗号隔开
            let linkArr = headers.split(",")
            for (let i = 0; i < linkArr.length; i++) {
                let temp = linkArr[i]
                // 如果不是以last结尾的link对象，则跳过
                if (temp.indexOf("rel=\"last\"") < 0) {
                    continue
                }
                // 以问号或者与号作分割符
                let paramArr = temp.split(/[\?&]/)
                for (let j = 0; j < paramArr.length; j++) {
                    let stemp = paramArr[j]
                    let kv = stemp.split("=")
                    // 找到 page=pageNum
                    if (kv[0] != "page") {
                        continue
                    }
                    // 返回pageNum
                    let pageNumber = parseInt(kv[1])
                    console.log(pageNumber)
                    return pageNumber
                }
            }
        } catch (e) {

        }

        return 0
    },
    addHttp(url){
        return url.match(/https?:\/\//i) ? "" : "https://" +  url
    },
    // 将utc时间转换为东八区时间,输入格式形如 2022-02-12T11:06:31z
    // 输出格式形如 2022-02-12 11:06:31 (具体数值不是这个)
    utcToLocal(time){
        // 当数字小于10时前面补0
        let formatNum = (num)=> {
            return num < 10? '0'+num : num;
        }
        let arr = time.split(/[^0-9]/)
        let world = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5])
        // 东八区时间比UTC时间早8个小时
        let local = new Date(world.getTime() + 8 * 60 * 60 * 1000)
        return formatNum(local.getFullYear()) + '-'+
            formatNum(local.getMonth() + 1) + '-' +
            formatNum(local.getDay())+ ' '+
            formatNum(local.getHours()) +':'+
            formatNum(local.getMinutes()) + ':'+
            formatNum(local.getSeconds())
    },
    getDate(){
        let mydate, y, m, d, hh, mm, ss;
        mydate = new Date()
        y = mydate.getFullYear()
        m = mydate.getMonth()
        d = mydate.getDate()
        hh = mydate.getHours()
        mm = mydate.getMinutes()
        ss = mydate.getSeconds()
        if (m < 10) m = '0' + m
        if (d < 10) d = '0' + d
        if (hh < 10) hh = '0' + hh
        if (mm < 10) mm = '0' + mm
        if (ss < 10) ss = '0' + ss
        return  y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    },

    uploadImage(data){
        return request({
          url: '/image/uploadImage',
          method: 'post',
          data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },
      delImgByUrl(data){
        return request({
          url: '/image/delImgByUrl',
          method: 'post',
          data
        })
      }


}