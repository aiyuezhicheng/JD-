function itcast(dom) {
  var obj = {
    tap: function (callback) {
      // 按下的时间
      var startTime;
      // 记录开始的坐标
      var startX, startY;
      // 按下
      dom.addEventListener("touchstart", function (e) {

        //  1 判断手指的个数
        if (e.touches.length > 1) {
          return;
        }

        // 2 记录按下的时间 // 获取19701 1 到现在的毫秒数 
        startTime = Date.now();

        // 3 记录坐标
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      })

      // 离开
      dom.addEventListener("touchend", function (e) {
        // 1 判断手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 2.0 获取离开的时间
        var endTime = Date.now();

        // 2.1 判断按下的时间是否满足要求 
        if (endTime - startTime > 300) {
          return;
        }

        // 3.0 记录离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;

        // 3.1 判断方向的移动
        if (Math.abs(endX - startX) > 5 || Math.abs(endY - startY) > 5) {
          return;
        }

        // 触发自己的点击的逻辑
        // console.log("tap事件被触发了!!!!");
        // if(callback){
        //   callback();
        // }
        callback && callback(e);
      })

      // obj
      return obj;
    },
    swipe: function (callback) {

      // 按下的时间
      var startTime;

      // 按下的坐标
      var startX, startY;

      // 按下
      dom.addEventListener("touchstart", function (e) {
        // 1.0 判断手指的个数
        if (e.touches.length > 1) {
          return;
        }

        // 2.0 记录按下的时间
        startTime = Date.now();

        // 3.0 记录按下的坐标
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      })

      // 离开
      dom.addEventListener("touchend", function (e) {
        // 1.0 判断手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 2.0 记录离开的时间
        var endTime = Date.now();

        // 2.1 判断时间
        if (endTime - startTime > 800) {
          return;
        }

        // 3.0 记录离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;

        // 方向
        var direction;

        // 3.1 先判断距离
        if (Math.abs(endX - startX) > 5) {
          // 3.1.2 再判断方向 
          direction = endX > startX ? "right" : "left";
        } else if (Math.abs(endY - startY) > 5) {
          // 3.2.1 判断方向
          direction = endY > startY ? "down" : "up";
        } else {
          // 水平方向和垂直方向都没有发生移动 
          return;
        }

        // 满足了所有的判断条件 执行自己的逻辑
        // console.log(direction);

        callback && callback(direction);
      })


      // this obj
      return this;
    }
  };
  return obj;
}