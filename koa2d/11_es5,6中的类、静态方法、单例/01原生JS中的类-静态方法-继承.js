// es5中的类和静态方法

function Person(name, age) {
    //构造函数里面的方法和属性
    this.name = name;
    this.age = age;
    this.run = function() {
        console.log(`${this.name}---${this.age}`);
    }
}
//通过原型链给类添加属性和方法，
//原型链上面的类和方法可以被多个实例共享
Person.prototype.sex = "男"
Person.prototype.work = function() {
    console.log('I am Working');
}

//静态方法
Person.setName = function(new_name) {
    console.log(`我叫${new_name}`);
}

var p1 = new Person("saisai", 21) //实例化
p1.run() //实例方法是通过实例化来调用的
p1.work()

Person.setName("ss") //静态方法是通过 类名. 调用



//es5的继承
/* 
    es5继承是通过 原型链继承和对象冒充的方式来实现的

    原因：对象冒充继承：无法继承原型链上面的属性和方法
        原型链继承：可以继承构造函数里面以及原型链上面我的属性和方法，但是实例化自雷的时候无法给父类传参
*/


function Adult(name, age) {
    this.name = name;
    this.age = age;
    this.run = function() {
        console.log(`${this.name}---${this.age}`);
    }
}

Adult.prototype.work = function() {
    console.log(`${this.name}`, 'I must earn money');
}

function Me(name, age) {
    Person.call(this, name, age) /* 对象冒充实现继承 */
}

Me.prototype = new Adult(); /* 如果没有原型链继承 下面的 me.work() 会报错：me.work is not a function */

var me = new Me("YZY", 24);
me.run()
me.work()