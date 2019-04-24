SET NAMES UTF8;
DROP DATABASE IF EXISTS eaterytwo;
CREATE DATABASE eaterytwo CHARSET=UTF8;
USE eaterytwo;

#轮播
CREATE TABLE eaterytwo_WheelPlanting(
  Wid INT PRIMARY KEY AUTO_INCREMENT,
  Wsrc VARCHAR(128),  #图片路径
  Whref VARCHAR(128)  #链接路径
);
insert into eaterytwo_WheelPlanting values
(null,"img/cate/HomeDishes/img_src/01.jpg",null),
(null,"img/cate/HomeDishes/img_src/02.jpg",null),
(null,"img/cate/HomeDishes/img_src/03.jpg",null),
(null,"img/cate/HomeDishes/img_src/04.jpg",null),
(null,"img/cate/HomeDishes/img_src/05.jpg",null),
(null,"img/cate/HomeDishes/img_src/06.jpg",null),
(null,"img/cate/HomeDishes/img_src/07.jpg",null),
(null,"img/cate/HomeDishes/img_src/08.jpg",null),
(null,"img/cate/HomeDishes/img_src/09.jpg",null),
(null,"img/cate/HomeDishes/img_src/10.jpg",null);

# 九宫格 squared paper for practicing calligraphy
CREATE TABLE eaterytwo_SPFPC(
  Sid INT PRIMARY KEY AUTO_INCREMENT,
  Sname VARCHAR(1128),#图片名称
  Ssrc VARCHAR(128),  #图片路径
  Shref VARCHAR(128)  #链接路径
);
insert into eaterytwo_SPFPC values
(null,"位置","img/grid/menu1.png",null),
(null,"点餐","img/grid/menu2.png",null),
(null,"商品","img/grid/menu3.png",null),
(null,"新闻","img/grid/menu4.png",null),
(null,"搜索","img/grid/menu5.png",null),
(null,"更多","img/grid/menu6.png",null);

#登录Signin
#注册register
#用户基本信息UserBasicInformation
CREATE TABLE eaterytwo_UserBasicInformation(
  Uid INT PRIMARY KEY AUTO_INCREMENT,
  Uname VARCHAR(128),#用户名称
  Upwd VARCHAR(128),   #用户密码
  Uemail VARCHAR(128), #用户邮箱
  Uphone VARCHAR(128) #用户电话
);
insert into eaterytwo_UserBasicInformation values
(null,"dingding","123456","1480181023@qq.com","13723267581"),
(null,"dangdang","123456","15137831311@163.com","18136967581");

#用户头像Userhead
CREATE TABLE eaterytwo_Userhead(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Uid INT, #用户编号
  Uimg VARCHAR(128) #用户头像
);
insert into eaterytwo_Userhead values
(null,"1","img/Userhead/01.jpg"),
(null,"2","img/Userhead/02.jpg");

#商品
#商品详情 Commoditydetails
#价格
CREATE TABLE eaterytwo_Commoditydetails(
  Cid INT PRIMARY KEY AUTO_INCREMENT,
  Cname VARCHAR(128), #商品名称
  Cmoney VARCHAR(128), #商品价格
  Csubtitle VARCHAR(128),#商品子标题
  Cdetails VARCHAR(128),#商品详情
  Csrc VARCHAR(128), #商品照片路径
  Cimg VARCHAR(128), #商品详情照片路径
  Chref VARCHAR(128) #链接路径
);
insert into eaterytwo_Commoditydetails values
(null,"卤香滑鸡","31","卤味十足,味道正,老字号,老手艺,老味道","适量加入牛奶调理，可以补充更多钙质，对于正在减肥中的女孩来说，也比较有饱足感。经常失眠或是容易经痛的女孩也可以喝喝看！不过有的人会怕椰子的味道，也因为椰子水生冷寒性，因此女孩们如果想喝椰子水来消暑，或是肠胃不好的人，在喝之前还是要三思！","img/cate/Menu/p2.png","img/cate/Menu/banner.jpg",null),
(null,"香蕉红薯糯米饼","32","成品金黄清新馥郁","香蕉红薯糯米饼，成品金黄，咬一口软软糯糯的，香蕉味清新馥郁。糯米皮是用红薯和糯米粉和制而成，再裹上香蕉片。香蕉和红薯都有润肠通便的作用，而糯米粉制品不易于消化，把红薯揉入糯米粉中，就能和暖肠胃，利于消化","img/cate/Menu/2019040915548036907209702111.jpg","img/cate/Menu/2019040915548036907209702111.jpg",null),
(null,"榛蘑烧小白菜","33","菜品味道好，营养丰富","鲜香的榛蘑与清香的小白菜搭配，素炒而成的菜品味道好，营养丰富，食疗功效很多，养生保健的一道美味","img/cate/Menu/2019040915547984834439702111.jpg","img/cate/Menu/2019040915547984834439702111.jpg",null),
(null,"茄子炖土豆","34","容易","超级简单的一道菜","img/cate/Menu/2019040915547987787349702111.jpg","img/cate/Menu/2019040915547987787349702111.jpg",null),
(null,"鸡块炖时蔬","35","小鸡炖蘑菇","鸡块盐炖时蔬，荤素搭配，营养均衡，有这一道菜就够了","img/cate/Menu/2019040915548037545029702111.jpg","img/cate/Menu/2019040915548037545029702111.jpg",null),
(null,"土豆蒸排骨","46","炸后耙软","排骨的新鲜做法，先炸后耙软可口上面变下放新鲜的土豆，非常的美味，好吃","img/cate/Menu/2019040915548132439549702111.jpg","img/cate/Menu/2019040915548132439549702111.jpg",null),
(null,"卤香滑鸡","37","卤味十足,味道正,老字号,老手艺,老味道","适量加入牛奶调理，可以补充更多钙质，对于正在减肥中的女孩来说，也比较有饱足感。经常失眠或是容易经痛的女孩也可以喝喝看！不过有的人会怕椰子的味道，也因为椰子水生冷寒性，因此女孩们如果想喝椰子水来消暑，或是肠胃不好的人，在喝之前还是要三思！","img/cate/Menu/p2.png","img/cate/Menu/banner.jpg",null),
(null,"香蕉红薯糯米饼","38","成品金黄清新馥郁","香蕉红薯糯米饼，成品金黄，咬一口软软糯糯的，香蕉味清新馥郁。糯米皮是用红薯和糯米粉和制而成，再裹上香蕉片。香蕉和红薯都有润肠通便的作用，而糯米粉制品不易于消化，把红薯揉入糯米粉中，就能和暖肠胃，利于消化","img/cate/Menu/2019040915548036907209702111.jpg","img/cate/Menu/2019040915548036907209702111.jpg",null),
(null,"榛蘑烧小白菜","21","菜品味道好，营养丰富","鲜香的榛蘑与清香的小白菜搭配，素炒而成的菜品味道好，营养丰富，食疗功效很多，养生保健的一道美味","img/cate/Menu/2019040915547984834439702111.jpg","img/cate/Menu/2019040915547984834439702111.jpg",null),
(null,"茄子炖土豆","22","容易","超级简单的一道菜","img/cate/Menu/2019040915547987787349702111.jpg","img/cate/Menu/2019040915547987787349702111.jpg",null),
(null,"鸡块炖时蔬","33","小鸡炖蘑菇","鸡块盐炖时蔬，荤素搭配，营养均衡，有这一道菜就够了","img/cate/Menu/2019040915548037545029702111.jpg","img/cate/Menu/2019040915548037545029702111.jpg",null),
(null,"茄子炖土豆","24","容易","超级简单的一道菜","img/cate/Menu/2019040915547987787349702111.jpg","img/cate/Menu/2019040915547987787349702111.jpg",null),
(null,"鸡块炖时蔬","35","小鸡炖蘑菇","鸡块盐炖时蔬，荤素搭配，营养均衡，有这一道菜就够了","img/cate/Menu/2019040915548037545029702111.jpg","img/cate/Menu/2019040915548037545029702111.jpg",null),
(null,"土豆蒸排骨","26","炸后耙软","排骨的新鲜做法，先炸后耙软可口上面变下放新鲜的土豆，非常的美味，好吃","img/cate/Menu/2019040915548132439549702111.jpg","img/cate/Menu/2019040915548132439549702111.jpg",null),
(null,"卤香滑鸡","37","卤味十足,味道正,老字号,老手艺,老味道","适量加入牛奶调理，可以补充更多钙质，对于正在减肥中的女孩来说，也比较有饱足感。经常失眠或是容易经痛的女孩也可以喝喝看！不过有的人会怕椰子的味道，也因为椰子水生冷寒性，因此女孩们如果想喝椰子水来消暑，或是肠胃不好的人，在喝之前还是要三思！","img/cate/Menu/p2.png","img/cate/Menu/banner.jpg",null),
(null,"香蕉红薯糯米饼","41","成品金黄清新馥郁","香蕉红薯糯米饼，成品金黄，咬一口软软糯糯的，香蕉味清新馥郁。糯米皮是用红薯和糯米粉和制而成，再裹上香蕉片。香蕉和红薯都有润肠通便的作用，而糯米粉制品不易于消化，把红薯揉入糯米粉中，就能和暖肠胃，利于消化","img/cate/Menu/2019040915548036907209702111.jpg","img/cate/Menu/2019040915548036907209702111.jpg",null),
(null,"榛蘑烧小白菜","42","菜品味道好，营养丰富","鲜香的榛蘑与清香的小白菜搭配，素炒而成的菜品味道好，营养丰富，食疗功效很多，养生保健的一道美味","img/cate/Menu/2019040915547984834439702111.jpg","img/cate/Menu/2019040915547984834439702111.jpg",null),
(null,"茄子炖土豆","20","容易","超级简单的一道菜","img/cate/Menu/2019040915547987787349702111.jpg","img/cate/Menu/2019040915547987787349702111.jpg",null);


#创建商品评论表
CREATE TABLE eaterytwo_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nid INT,
  uname VARCHAR(125),
  content VARCHAR(120),
  ctime DATETIME
);

#创建购物车表
#货币误差 小数 1-0.99=0.100000000001
#price INT 要求精度高不允许
#1.99*100=199 单位分 200/100=2.00
CREATE TABLE eaterytwo_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  pid INT,
  price DECIMAL(10,2),
  pname VARCHAR(255),
  pimg VARCHAR(255),
  count INT
);

#创建购物总价表
CREATE TABLE eaterytwo_total(
  id INT PRIMARY KEY AUTO_INCREMENT,
  price DECIMAL(10,2)
);

#创建临时用户名存放处Depository
CREATE TABLE eaterytwo_Depository(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(255),
  uid VARCHAR(255)
);