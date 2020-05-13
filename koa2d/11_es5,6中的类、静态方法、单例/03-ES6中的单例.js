/* 
    ES6中单例通过类的静态方法来实现
*/

class DBtools {
    static getInstance() {
        if (!DBtools.instance) {
            DBtools.instance = new DBtools()
        }
        return DBtools.instance
    }

    constructor() {
        console.log('实例化会触发构造函数');
        this.connect()
    }

    connect() {
        console.log('连接数据库');
    }

    find(sss) {
        console.log('查询数据库' + String(sss));
    }
}


var db = DBtools.getInstance()

var db2 = DBtools.getInstance()

var db3 = DBtools.getInstance()

var db4 = DBtools.getInstance()

db.find(1)
db2.find(2)
db3.find(3)
db4.find(4)
    /* 
    实例化会触发构造函数
    连接数据库
    查询数据库1
    查询数据库2
    查询数据库3
    查询数据库4

    不论实例化多少次，构造函数只会实例化一次
    */