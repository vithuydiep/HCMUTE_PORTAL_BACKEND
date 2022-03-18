const express = require('express')
const auth = require('../../../middlewares/auth')
const { activityController } = require('../../controllers')

const router = express.Router()
router.get('/admin/total-request', activityController.getTotalRequestAcivity)
router.post('/create-activity',auth ,activityController.createActivity)
router.post('/register-activity',auth ,activityController.registerActivityForStudent)
router.get('/student/list-activity-for-user',auth, activityController.getListActivityByUser)
router.get('/student/total-activity-for-user',auth, activityController.getTotalActivityForUser)
router.get('/admin/activity/get-all-list-activity',auth,activityController.getActivityForAdmin)
router.post('/admin/activity/edit-activity',auth,activityController.editActivity)
router.get('/admin/getListAttendance/:slug', activityController.getListAttendance)
router.get('/total/:slug', activityController.getTotalActivity)
router.get('/:slug', activityController.show)
router.delete('/:id',auth, activityController.deleteActivity)
router.get('/' ,activityController.loadListActivity)

module.exports = router
