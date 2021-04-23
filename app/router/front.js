module.exports = app => {
    const { router, controller } = app;
    router.get('/front/index', controller.front.home.index)
    router.get('/front/article/list', controller.front.home.getArticleList)
    router.get('/front/articles/:id', controller.front.home.getArticsByTypeId)
    router.get('/front/article/:id', controller.front.home.getArticleById)
    router.get('/front/type/list', controller.front.home.getTypeInfo)
    
}
