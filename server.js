const jsonServer = require("json-server"); // json server
const jwt = require("jsonwebtoken"); // import jwt
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ noCors: true });
server.use(middlewares); //cần thiết
server.use(jsonServer.bodyParser); // cần thiết
server.use(
  // yarn add cors
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
server.options("*", cors());

// custom route:
server.post("/auth/login", (req, res) => {
  //server.post/get/put/delete('/path',(req, res)=>{   })
  let { username, password } = req.body; // request username và password để kiểm tra và cấp token
  /*
  kiểm tra dữ liệu của request để response ra token
  nếu request sai thì trả về message
  */
  if ((username.trim() == "admin" && password == "123456") || (username.trim() == "guest" && password == "123456") ) {
    // token sign là phương thức tạp ra token cho response từ dữ liệu request đã đưa vào
    let token = jwt.sign({ username, roles: ["read_users"] }, "private_key", {
      expiresIn: 80 * 80,
    }); // tham số thứ nhất không cần bảo mật , và bảo mật tham số 2
    //{expiresIn:80*80} is time to expire code
    res.jsonp({
      status: true,
      token: token,
      username: username,
    });
  }
  else{
    res.jsonp({
      status: false,
      message: "Incorrect password",
    });
  }
  //guest Account
});
// authen token : nếu token đã tạo trùng với token trong hàm sau thì sẽ được thông qua bằng hàm next()
server.use((req, res, next) => {
  //middlewares: gồm req,res,next,,,
  // data=[Bearer : tên,ákjgrugjDSJfKSksjfhkDHSifhldkIO : token]
  let data = req.headers.authorization && req.headers.authorization.split(" ");
  if (data && data.length == 2) {
    // nếu data và length = 2 thì gán token cần verify bằng data[1] bởi data[0] là 'bearer'
    let token = data[1];
    try {
      // hàm này sẽ decode ra cái gì đã sign ở trên theo cái key của nó ví dụ private_key
      let decoded = jwt.verify(token, "private_key"); // decode ra username vì sign ở trên
      if (decoded.username) {
        next(); // đi tiếp
      } else {
        res.sendStatus(401);
      }
    } catch {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401); // nếu data không tồn tại hoặc length khác 2 thì bắn ra lỗi
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running ai PORT 3001");
});
