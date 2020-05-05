/* 
    async 是让方法变成异步     
    await 是 等待异步方法执行完成，可以获取异步方法里面的数据，但是必须在异步方法里面使用

    await 可以是异步方法变成同步方法
*/

async function getData() {
    return "this is my love!"
}

console.log(getData()); // getData() 返回一个Promise对象  Promise { 'this is my love!' }

/* 
ss = await getData() //报错  await方法必须放进异步方法中使用
console.log(ss)
 */

//如何获取 async异步方法中数据

//第一种方法

var p = getData()
p.then((data) => {
    console.log(2);
    console.log(data); //输出 ：this is my love!
})

//第二种方法

async function testAsync() {
    console.log(1);
    val = await getData() // await阻塞的功能，把异步改成一个同步
    console.log(val);
    console.log(3);
}
testAsync()
    /* 输出顺序：  
        1
        2
        this is my love!
        this is my love!
        3 
    */

// aysnc 修饰的方法返回的是一个Promise对象


function getData2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var username = "张三"
            resolve(username)
        }, 1000)
    })
}

//一、用.then()方法获取数据
var p2 = getData2()
p2.then((data) => {
    console.log(data);
})

//二、用await获取异步方法中的数据

async function test2() {
    var data = await getData2()
    console.log(data);
}
test2()