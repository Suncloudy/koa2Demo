/* 
    1.  let
    2.  const
    3.  箭头函数
    4.  模板字符串  ``
    5.  属性、方法的简写
    6.  primise

*/

/* 
    let         let 和 var一样，不过他是块机作用域
*/

var name1 = "qixiaohan"
let name2 = "suncloudy"

console.log(name1); //qixiaohan
console.log(name2); //suncloudy

if (true) {
    var age1 = 12
    let age2 = 14
}

console.log(age1); //12
//console.log(age2); // age2 is not defined


/* 
    const  定义一个常量  不允许修改
*/

const PI = 3.14
    //PI = 3 //const 定义的常量不允许修改

console.log(PI);


/* 
    箭头函数
*/
setTimeout(function() {
    console.log("100毫秒之后执行");
}, 100)


setTimeout(() => {
    console.log("200毫秒之后执行");
}, 200)




/* 
    模板字符串   倒引号       ``
*/

console.log(name1 + "的年龄是" + age1);
console.log(`${name1}的年龄是${age1}`);


/* 
    方法，属性的简写
*/
let province = "河南1"
let student = {
    province: province,
    study: function() {
        console.log("努力学习1！");
    }
}
console.log(student.province);
student.study()
    //简写之后

let province2 = "河南2"
let student2 = {
    province2,
    study2() {
        console.log("努力学习2！");
    }
}

console.log(student2.province2);
student2.study2()


/* 
    回调函数：获取异步方法里面的数据
*/
function getData(callback) {
    setTimeout(() => {
        var myname = "YZY"
        callback(myname)
    }, 200)
}

function sss(data) {
    console.log(data + "------------");
}

// 将函数 sss作为 getData函数的 回调函数，待 getData函数的setTimeOut()函数执行 将 myname参数传给 回调函数  sss，以此获取 异步方法里面的数据
getData(sss)


/* 
    promise
*/

//第一种方式
var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        let name = "lss"
        if (Math.random() < 0.5) {
            resolve(name)
        } else {
            reject("失败")
        }
    }, 1000)
})

p.then((data) => {
    console.log(data);
}).catch((data1) => {
    console.log(data1);
})

//第二种方式
function setPromise(resolve, reject) {
    setTimeout(() => {
        let name = "yzy"
        if (Math.random() < 0.5) {
            resolve(name)
        } else {
            reject("失败")
        }
    }, 2000)
}
var p1 = new Promise(setPromise) //注意 只能写 函数名，不能写函数

p1.then((data) => {
    console.log(data);
}).catch((data1) => {
    console.log(data1);
})