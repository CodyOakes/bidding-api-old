const express = require('express')
const router = express.Router()

const { authentication, authorization } = require('../middleware/auth')

const {
  getCustomers,
  getCustomer,
  postCustomer,
  patchCustomer,
  deleteCustomer,
} = require('../controller/customers')

router.get('/', authentication, authorization('customers_read'), getCustomers)
router.get('/:id', authentication, authorization('customers_read'), getCustomer)
router.post('/', authentication, authorization('customers_write'), postCustomer)
router.patch(
  '/:id',
  authentication,
  authorization('customers_write'),
  patchCustomer
)
router.delete(
  '/:id',
  authentication,
  authorization('customers_delete'),
  deleteCustomer
)

module.exports = router
