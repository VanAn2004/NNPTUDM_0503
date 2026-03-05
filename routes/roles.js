var express = require('express');
var router = express.Router();
let { dataRole, dataUser } = require('../utils/data');

// 1. GET ALL ROLES
router.get('/', (req, res) => {
  res.send(dataRole);
});

// 2. YÊU CẦU BÀI TẬP: Lấy tất cả user trong một role
router.get('/:id/users', function (req, res) {
  let idRole = req.params.id; // Lấy r1, r2 hoặc r3 từ URL
  
  // Lọc danh sách user
  let result = dataUser.filter(function (user) {
    return user.role.id == idRole;
  });

  if (result.length > 0) {
    res.send(result);
  } else {
    res.status(404).send({ message: "Không tìm thấy user nào cho Role này hoặc ID Role sai." });
  }
});

// 3. POST: Tạo role mới (để chụp ảnh nộp bài)
router.post('/', function (req, res) {
  let newRole = {
    id: "r" + (dataRole.length + 1),
    name: req.body.name,
    description: req.body.description,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dataRole.push(newRole);
  res.status(201).send(newRole);
});
// Request này dùng phương thức GET vì là lấy dữ liệu
router.get('/:id/users', function (req, res) {
  let idRole = req.params.id;
  // Lọc trong dataUser xem ai có role.id khớp với id trên URL
  let result = dataUser.filter(u => u.role.id == idRole);
  
  res.send(result);
});

module.exports = router;