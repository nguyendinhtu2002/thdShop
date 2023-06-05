const express = require("express")
const router = express.Router()
const { register, Login ,getUserById, RefreshTokenController, Logout, LoginAdmin, getAllUser, updateUser, deleteUser } = require("../controller/UserController")
const { protect, admin } = require("../middlerware/AuthMiddleware")

router.post("/register", register)
router.post("/login", Login)
router.post('/refresh_token', RefreshTokenController)
router.post('/logout', Logout)
router.get('/getAll',getAllUser)
router.get("/:_id", getUserById)
router.post('/login/admin',LoginAdmin)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)

module.exports = router
