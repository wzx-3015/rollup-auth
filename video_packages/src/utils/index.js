/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 13:26:36
 * @LastEditTime: 2022-01-12 09:46:17
 * @LastEditors: @Xin (834529118@qq.com)
 */
/**
 * @description: 加载文件Jessibuca
 * @param {*}
 * @return {*}
 */
export const loadJessibuca = (
  url = "/video_packages/dist/jessibuca/jessibuca.js"
) => {
  const jscript_essibuca = document.querySelector("script[jessibuca]");
  if (window.Jessibuca) {
    return Promise.resolve(window.Jessibuca);
  }

  if (jscript_essibuca) {
    return new Promise((resolve, reject) => {
      jscript_essibuca.addEventListener("load", () => {
        resolve(window.Jessibuca);
      });
    });
  }

  const script = document.createElement("script");
  script.src = url;
  script.setAttribute("jessibuca", true);

  return new Promise((resolve, reject) => {
    script.addEventListener("load", () => {
      resolve(window.Jessibuca);
    });

    script.onerror = (err) => {
      console.error(err);
      reject(err);
    };

    document.body.appendChild(script);
  });
};

/**
 * @description: 全屏操作
 * @param {*}
 * @return {*}
 */
export const launchFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};

/**
 * @description: 退出全屏操作
 * @param {*}
 * @return {*}
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
