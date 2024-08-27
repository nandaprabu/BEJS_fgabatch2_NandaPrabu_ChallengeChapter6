const express = require('express')
const router = express.Router()
const { cloud } = require('../../config/storage/multer')

const {create,
    getAll,
    getDetails,
    update,
    deleting
} = require('../../controllers/controller.mhs')


router.post('/create', cloud(
    ['image/png', 'image/jpeg']
).single('image') , create)

router.get('/', getAll)

router.get('/:mhsId', getDetails)

router.put('/update/:mhsId', cloud(
    ['image/png', 'image/jpeg']
).single('image'), update)

router.delete('/delete/:mhsId', deleting)


module.exports = router



// router.put('/:id/upload-banner', cloud(
// 	['image/png', 'image/jpeg']
// ).single('file'), MEMBER_CONTROLLER.uploadBannerMember);