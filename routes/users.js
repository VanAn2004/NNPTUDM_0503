var express = require('express');
var router = express.Router();
let { dataRole, dataUser } = require('../utils/data');

// 1. Lấy danh sách user (Chỉ giữ lại 1 hàm GET /)
router.get('/', (req, res) => {
  res.send(dataUser);
});

// 2. Tạo User mới
router.post('/', function (req, res) {
  // Tìm thông tin Role từ id truyền lên
  // Dùng .find() để chắc chắn tìm được vì dataRole không có trường isDeleted
  let role = dataRole.find(r => r.id === req.body.roleId);
  
  if (!role) {
    return res.status(404).send({ message: "ROLE ID NOT FOUND" });
  }

  let newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl || "https://i.sstatic.net/l60Hf.png",
    status: true,
    loginCount: 0,
    role: {
        id: role.id,
        name: role.name,
        description: role.description
    },
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dataUser.push(newUser);
  res.status(201).send(newUser);
});

// ĐÃ XÓA đoạn router.get('/') dư thừa ở đây

module.exports = router;