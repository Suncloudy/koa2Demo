//定义Person类

class Person {
    /* 类的构造函数，实例化的时候之心，new的时候执行 */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        console.log(this.name);
    }
    setName(name) {
        this.name = name
        console.log(`我的新名字:${this.name}`);
    }
    static work() {
        console.log('我是静态方法,实例化不能调用我哦，请通过 class.function()的方式来调用');
    }
}

const p = new Person('YZY', 30)
p.getName() /* YZY */
p.setName('Sun') /* 我的新名字:YZY */
p.getName() /* Sun */

console.log('\n-------------------继承----------------\n');

//继承
class Student extends Person {
    constructor(name, age, sex) {
        super(name, age) /* 实例化子类的时候把子类的数据传递给父类 */
        this.sex = sex
    }
    print() {
        console.log(`${this.name}---${this.age}---${this.sex}`);
    }
}

Person.level = 666

const stu = new Student('YZY', 24, 'boy')
stu.getName()
stu.print()
stu.setName("LSS")
stu.print()
    /* 
        YZY
        YZY---24---boy
        我的新名字:LSS
        LSS---24---boy
    */
Student.work() //通过 类名.方法调用从父类继承过来的  静态方法

console.log(Person.level); /* 666 */
console.log(Student.level); /* 666 */