//引入二个模块 mysql express
const express = require('express');
const mysql = require('mysql');
//1.1引入模块 cors 
const cors = require('cors');


//创建连接池
var pool=mysql.createPool({
	  host: process.env.MYSQL_HOST,
	  port: process.env.MYSQL_PORT,
	  user: process.env.ACCESSKEY,
	  password: process.env.SECRETKEY,
	  database: 'app_' + process.env.APPNAME ,//使用的数据库
	connectionLimit:20  //设置连接池的数量
});
// 3.创建express对象
var server = express();
//3.1配置允许访问列 脚手架8080//跨域

//3.1.1//引入session模块
const session = require("express-session");

//3.1.2 session配置信息
server.use(session({
  secret:"128位随机字符串",   //安全字符串
  resave:false,             //每次请求更新session值
  saveUninitialized:true,   //初始化保存数据
  cookie:{                  //cookie 辅助session 工作
    maxAge:1000*60*60       //session对象存活
  }
}));

// 3.2配置静态文件的目录public
server.use(express.static("public"));
//3.3配置第三方中间件
const bodyParser = require("body-parser");
//3.4:配置json是否自动转换
server.use(bodyParser.urlencoded({
    extended:false
}))
//4.为express对象绑定监听端口 3000
server.listen(3000, (err) => {
	if(err) throw err;
	console.log('yes');
});
// 3.2配置静态文件的目录public
server.use(express.static("public"));


//功能三：登录
// 功能一：用户登录
//1.用户get请求路径/login
//2.获取二个参数uname upwd
//3.创建sql
//4.执行sql
//5.获取数据库返回结果
//6.返回客户数据
//登录
server.post("/login",(req,res)=>{
    var u=req.body.uname;
    var p=req.body.upwd;
    var sql = "select Uid,Uname from eaterytwo_userbasicinformation where Uname=? and Upwd=?";
    pool.query(sql,[u,p],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({
                code: -1,
                msg: "用户名或密码错误"
            });
        }else if(result.length!=0){
          //登陆成功
          //获取用户id
          // console.log(result);
          // console.log(result[0]);
          // console.log(result[0].Uid);
          var uid = result[0].Uid;
          var Uname = result[0].Uname;
          // console.log(uid);
         
          //保存session对象中
          req.session.uid = uid;
          req.session.uname = Uname;
          // console.log(req.session.uid);
            res.send({
                code: 1,
                data:result
            });
        }
    })
});
//功能3.2 查重
server.get('/inquire', (req, res) => {
	var u = req.query.uname;
	//数据库查询数据
	var sql="SELECT Uname FROM eaterytwo_userbasicinformation where Uname=?";
	pool.query(sql,[u],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
            res.send({code: -1,result:-1});
		}else{
			res.send({code: 1,result:1});
		}
	});	
});
//功能3.3 用户头像获取 eaterytwo_Userhead
//功能3.3 用户头像获取 eaterytwo_Userhead
server.get("/Userhead", (req, res) => {
  if(!req.session.uid){
    res.send({code:-1,data:[],msg:"请登录"});
    return;
  }
   //1:参数
   var uid = req.session.uid;
   //2:sql
    // 4:创建sql语句查询当前数据库是否存在
  var sql = "select Uimg from eaterytwo_Userhead";
  sql += " where Uid = ?";
  pool.query(sql, [uid], (err, result) => {
      //回调函数:什么时候执行函数
      //sql语句执行完毕并且返回解果
      if(result.length==0){
        // insert
        Uimg="img/Userhead/xinling.jpg";
        var sql = `insert into eaterytwo_Userhead`;
        sql+=` values(null,${uid},'${Uimg}')`;
        pool.query(sql,(err,result)=>{
          if(err) throw err;
          res.send({ code: 1, data: [Uimg]})
        });
      }else{
        // select
        // var sql = `select Uid,Uimg from eaterytwo_Userhead`;
        // sql+=` where Uid = ${uid}`;
        res.send({ code: 1, data: result })
      }
  });
});



//功能四：注册
server.post("/register",(req,res)=>{
    var u=req.body.uname;
    var p=req.body.upwd;
    var eil = req.body.uemail;
    var t = req.body.uphone;
    if(!u){res.send("用户名不存在");return;}
    if(!p){res.send("密码不存在");return;}
    if(!eil){res.send("email不存在");return;}
    if(!t){res.send("号码不存在");return;}
    //数据库修改数据
    var sql = "insert into eaterytwo_userbasicinformation values(null,?,?,?,?)"
    pool.query(sql,[u,p,eil,t],(err,result)=>{
        if(err) throw err;
         res.send({
             code: 1,
             data: result
         });
    })
});

//功能一：首页轮播图
server.get("/imglist",(req,res)=>{
    //查询数据库
    sql = "select Wsrc from eaterytwo_WheelPlanting";
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({code:1,data:result});
    });
});
//功能二：首页九宫格
server.get("/grid", (req,res) => {
    //查询数据库
    sql = "select Sname,Ssrc from eaterytwo_SPFPC";
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({code:1,data:result});
    });
});
//功能五：商品栏
server.get("/Cbar", (req,res) => {
    //查询数据库
    sql = "select Cname,Cmoney,Csubtitle,Cdetails,Csrc,Cimg,Chref from eaterytwo_Commoditydetails";
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({code:1,data:result});
    });
});
//功能六:商品分页显示
server.get("/news", (req, res) => {
    //*参数    pno 页码 pageSize 页大小
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    //*默认值  1   7
    if (!pno) {
        pno = 1
    }
    if (!pageSize) {
        pageSize = 4
    }
    var sql = " SELECT Cid,Cname,Cmoney,Csrc";
    sql += " FROM eaterytwo_Commoditydetails";
    sql += " LIMIT ?,?";
    var offset = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [offset, pageSize], (err, result) => {
        if (err) throw err;
        res.send({
            code: 1,
            data: result
        });
    });
});
//功能七:商品详细信息
server.get("/newsInfo",(req,res)=>{
  //1:获取客户参数 nid
  var nid = req.query.nid;
  //2:拦载用户非法参数
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(nid)){
     res.send({code:-1,msg:"参数格式不正确"});
     return;
  }
  var sql = "SELECT Cid,Cname,Cmoney";
  sql += " ,Csubtitle,Cdetails,Csrc,Cimg";
  sql += " FROM eaterytwo_Commoditydetails WHERE Cid = ?";
  nid = parseInt(nid);
  pool.query(sql,[nid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result});
  })
});

//功能7.1、7.2 商品详细上下页信息
//上一页
server.get("/Previouspage",(req,res)=>{
  //1:获取客户参数 nid
  var nid = req.query.nid;
  //2:拦载用户非法参数
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(nid)){
     res.send({code:-1,msg:"参数格式不正确"});
     return;
  }
  var sql = "SELECT Cid,Cname,Cmoney";
  sql += " ,Csubtitle,Cdetails,Csrc,Cimg";
  sql += " FROM eaterytwo_Commoditydetails WHERE Cid = ?";
  nid = parseInt(nid);
  pool.query(sql,[nid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result});
  })
});
//下一页
server.get("/nextpage",(req,res)=>{
  //1:获取客户参数 nid
  var nid = req.query.nid;
  //2:拦载用户非法参数
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(nid)){
     res.send({code:-1,msg:"参数格式不正确"});
     return;
  }
  var sql = "SELECT Cid,Cname,Cmoney";
  sql += " ,Csubtitle,Cdetails,Csrc,Cimg";
  sql += " FROM eaterytwo_Commoditydetails WHERE Cid = ?";
  nid = parseInt(nid);
  pool.query(sql,[nid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result});
  })
});


//功能八:发送评论
server.post("/addcomment",(req,res)=>{
  //1:获取参数 nid 新闻编号 content评论内容
  var nid = req.body.nid;
  var content = req.body.content;
  var uname = req.session.uname;
  //2:sql
  var sql = "INSERT INTO eaterytwo_comment VALUES(null,?,?,?,now())";
  pool.query(sql,[nid,uname,content],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result,msg:"添加成功"})    
  })
  //3:json
});
////获取用户名 Gettheusername
//功能九:评论列表
server.get("/getComment", (req, res) => {
    //1:参数 
    var nid = req.query.nid;
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if (!pno) {
        pno = 1;
    }
    if (!pageSize) {
        pageSize = 5;
    }
    //2:sql
    var sql = " SELECT id,nid,content,uname,ctime";
    sql += " FROM eaterytwo_comment";
    sql += " WHERE nid = ?";
    sql += " LIMIT ?,?";
    var offset = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [nid, offset, pageSize], (err, result) => {
        if (err) throw err;
        res.send({
            code: 1,
            data: result
        });
    })
    //3:result
});

//功能十:查询购物车列表
server.get("/getShopCart",(req,res)=>{
  if(!req.session.uid){
    res.send({code:-1,data:[],msg:"请登录"});
    return;
  }
   //1:参数 uid 用户登录成功保存服务器
   //node.js 程序不是保存脚手架
   //服务器对象 session
  //  var uid = 1; //后面替换
  var uid = req.session.uid;
   //2:sql
  var sql = "SELECT id,pid,price,uid,pname,pimg,count";
   sql += " FROM eaterytwo_cart";
   sql+=" WHERE uid = ?";
   pool.query(sql,[uid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result});
    //  console.log(result);
   })
   //3:json
});

//功能十一:删除购物车中某个商品
server.post("/removeItem",(req,res)=>{
  var id = req.body.id;
  var sql = " DELETE FROM eaterytwo_cart";
  sql+=" WHERE id = ?";
  id = parseInt(id);
  pool.query(sql,[id],(err,result)=>{
    if(err)throw err;
    //执行sql语句影响行数 
    //INSERT UPDATE DELETE 判断条件
    if(result.affectedRows > 0){
       res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
});

//功能十二:删除用户选中(多个)商品
server.get("/removeMItem",(req,res)=>{
   //1:参数
   var ids = req.query.ids;
   //2:sql
   var sql = "DELETE FROM eaterytwo_cart";
   sql+=" WHERE id IN ("+ids+")";
   //3:json
   pool.query(sql,(err,result)=>{
     if(err)throw err;
     if(result.affectedRows>0){
       res.send({code:1,msg:"成功删除多个商品"})
     }else{
       res.send({code:-1,msg:"删除失败"});
     }
   })
}); 

//功能十五：购买用户选中(多个)商品
server.get("/Purgoods", (req, res) => {
   //1:参数
   var price = req.query.price;
   //2:sql
    // 4:创建sql语句查询当前数据库是否存在
  var sql = "select id from eaterytwo_total";
  sql += " where price = ?";
  pool.query(sql, [price], (err, result) => {
      //回调函数:什么时候执行函数
      //sql语句执行完毕并且返回解果
      if(result.length==0){
        // insert
        var sql = `insert into eaterytwo_total`;
        sql+=` values(null,${price})`;
      }else{
        // select
        var sql = `select price from eaterytwo_total`;
        sql+=` where price = ${price}`;
      }
      pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
      });
  });
});

//功能十六：购买用户选中(多个)商品价格 commodity price
server.get("/commodity", (req, res) => {
   //1:参数
   var price = req.query.price;
   //2:sql
    // 4:创建sql语句查询当前数据库是否存在
  var sql = "select price from eaterytwo_total";
  sql += " where price = ?";
  pool.query(sql, [price], (err, result) => {
      //回调函数:什么时候执行函数
      //sql语句执行完毕并且返回解果
      // select
      if(err) throw err;
        res.send({code:1,data:result})
      });
});


//功能十三：用户点击添加购物车按钮
server.get("/addcart",(req,res)=>{
  // 0:向数据库表 eaterytwo_cart 添加一列count INT  
  // ALTER TABLE eaterytwo_cart ADD count INT
  // UPDATE eaterytwo_cart SET count = 1;
  // 1:获取参数 uid pid pname price
  if(!req.session.uid){
    res.send({code:-1,data:[],msg:"请登录"});
    return;
  }
  var uid = req.session.uid;
  var pid = req.query.pid;
  var pname = req.query.pname;
  var price = req.query.price;
  var pimg = req.query.pimg;
  // 2:判断用户是否已经登录
  // 3:如果当前用户未登录，程序停止
  //     返回出错信息  请登录
  // 4:创建sql语句查询当前用户是否添加过此商品
  var sql = "select id from eaterytwo_cart";
  sql+=" where uid = ? and pid = ?";
  pool.query(sql,[uid,pid],(err,result)=>{
    //回调函数:什么时候执行函数
    //sql语句执行完毕并且返回解果
    if(result.length==0){
      // insert
      var sql = `insert into eaterytwo_cart`;
      sql+=` values(null,${uid},${pid},${price},'${pname}','${pimg}',1)`;
    }else{
      // update
      var sql = `update eaterytwo_cart set`;
      sql+=` count=count+1`;
      sql+=` where uid = ${uid} and pid = ${pid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,msg:"添加成功"})
    });
  })
  // 5:创建sql语句如果没有查询结果添加此商品
  var sql = "insert into eaterytwo_cart(id,uid,pid,pname,price,pimg,count)";
  sql+="values(null,?,?,?,?,?,?)";
  // x:创建sql语句结果有结果更新数量
  var sql = "update eaterytwo_cart set count=count+1";
  sql+=" where uid = ? and pid = ?";
});

//功能十四:商品加减
//减法
server.get("/addsub",(req,res)=>{
  var count = req.query.count;
  // console.log("count:" + count);
  var pname = req.query.pname;
  // console.log("pname:" + pname);
  var price = req.query.price;
  // console.log("price:" + price);
  if (count >1) {
      var sql = `UPDATE eaterytwo_cart SET count =count-1  WHERE pname = ? and price = ?;`;
          pool.query(sql, [pname, price], (err, result) => {
          if(err) throw err;
          res.send({code:1,data:result})
      });
  }else if(count==1){
    var sql = `UPDATE eaterytwo_cart SET count = ? WHERE pname = ? and price = ?;`;
          pool.query(sql, [count,pname, price], (err, result) => {
          if(err) throw err;
          res.send({code:1,msg:"已经到底啦:<"})
      });
  }else{
    count=1;
    var sql = `UPDATE eaterytwo_cart SET count = ? WHERE pname = ? and price = ?;`;
          pool.query(sql, [count,pname, price], (err, result) => {
          if(err) throw err;
          res.send({code:1,msg:"已经到底啦:<"})
      });
  }
});
//加法
server.get("/addaddition", (req, res) => {
  var count = req.query.count;
  // console.log("count:" + count);
  var pname = req.query.pname;
  // console.log("pname:" + pname);
  var price = req.query.price;
  // console.log("price:" + price);
  if (count >= 1) {
      var sql = `UPDATE eaterytwo_cart SET count = count+1 WHERE pname = ? and price = ?;`;
          pool.query(sql, [pname, price], (err, result) => {
          if(err) throw err;
          res.send({code:1,data:result})
      });
  }
});

// 功能十六\商品搜索
server.get("/search",(req,res)=>{
  //1:获取参数并且默认值
  var kwords = req.query.kwords
  //2:创建sql
  var sql = "SELECT Cid,Cname,Cmoney,Csubtitle,Cdetails,Csrc,Cimg";
  sql += " FROM eaterytwo_Commoditydetails";
  sql += " WHERE Cname LIKE concat('%',?,'%')";
  pool.query(sql, [kwords], (err, result) => {
    if(err)throw err;
    if(result.length>0){
      res.send({code:1,data:result})
    }else{
      res.send({code:-1,data:'暂无此物品'})
    }
  })
  //3:返回值 json
})

//功能十七、
//用户名获取User name acquisition
server.get("/Uacquisition",(req,res)=>{
  if(!req.session.uid){
    res.send({code:-1,data:[],msg:"请登录"});
    return;
  }
  var uid = req.session.uid;
  var uname = req.session.uname;
  // console.log(uid);
  // console.log(uname);
  var sql = "select Uid,Uname from eaterytwo_userbasicinformation where Uid=? and Uname=?";
    pool.query(sql,[uid,uname],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({
                code: -1,
                msg: "用户名或密码获取失败"
            });
        }else if(result.length!=0){
            res.send({
                code: 1,
                data:result
            });
        }
    })
})
//点击撤销登陆 Cancellation of landing
server.get("/Cancellationlanding", (req, res) => {
  if(!req.session.uid){
    res.send({code:-1,data:[],msg:"请登录"});
    return;
  }
  req.session.uid = null;
  req.session.uname = null;
  var uid = req.session.uid;
  var uname = req.session.uname;
  // console.log(uid);
  // console.log(uname);
  var sql = "select Uid,Uname from eaterytwo_userbasicinformation where Uid=? and Uname=?";
    pool.query(sql,[uid,uname],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({
                code: -1,
                msg: "用户名或密码获取失败"
            });
        }else if(result.length!=0){
            res.send({
                code: 1,
                data:result
            });
        }
    })
})
