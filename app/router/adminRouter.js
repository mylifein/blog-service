module.exports = app => {
    const { router, controller } = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.adminController.index)
    router.post('/admin/checkLogin', controller.admin.adminController.checkLogin)
    router.get('/admin/types', adminauth, controller.admin.adminController.getTypeInfo)
    router.post('/admin/addArticle', controller.admin.adminController.addArticle)
    router.post('/admin/updateArticle', controller.admin.adminController.updateArticle)
    router.get('/admin/articleList', controller.admin.adminController.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.adminController.delArticle)
    router.get('/admin/article/:id',adminauth,controller.admin.adminController.getArticleById)
}