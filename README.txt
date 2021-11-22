xin chào mày!!
lí do mày vào đây là do mày quên cách tạo json server để authen-author đúng không?
để tao nhắc cho mày nhớ:
-b1:tạo 1 thư mục bất kỳ - sau đó tạo file tên là db.json , trong file vừa tạo m viết 1 định dạng json bất kỳ
-b2:cd đến thư mục vừa tạo : yarn add/npm install -g json-server, sau khi cài xong xuất hiện file package.json
-b3: tạo file server.js và paste vào : //nhớ sửa port để không bị trùng với project

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running in 3001')
})


-b4:mở cmd và cd vào thư mục install: npm install/yarn add json-server --save-dev để cài đặt authen
-b5:ở package.json thêm thuộc tính đối tượng script dạng json để khởi chạy khi yarn start:
  "scripts": {
    "start": "node server.js"
  },
  -b6: cài đặt jwt: jsonwebtoken : yarn add jsonwebtoken 
  -b7: ở file server.js : import jwt và làm thwo dựa trên file server.js