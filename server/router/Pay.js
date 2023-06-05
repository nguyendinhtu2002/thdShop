const express = require("express")
const { createPay, getPayAll, getDetailPay, updatePay, deletePay } = require("../controller/PayController")
const router = express.Router()


router.post("/", createPay)
router.get('/',getPayAll)
router.get('/:id',getDetailPay)
router.put('/:id',updatePay)
router.delete('/:id',deletePay)
module.exports = router
