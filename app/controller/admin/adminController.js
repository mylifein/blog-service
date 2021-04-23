'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async index() {
    const { ctx, app } = this;

    ctx.body = 'Hello Admin'
  }

  // 校验登录
  async checkLogin() {
    const { ctx, app } = this
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    const sql = 'SELECT username FROM admin_user WHERE username = "' + username + '" AND password = "' + password + '"'
    const result = await app.mysql.query(sql)
    if (result.length > 0) {
      let openId = + new Date()
      ctx.session.openId = openId
      ctx.body = { 'data': '登录成功', 'openId': openId }
    } else {
      ctx.body = { 'data': '登录失败' }
    }
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const { ctx, app } = this
    const results = await app.mysql.select('type')
    this.ctx.body = { data: results }
  }

  async addArticle() {
    const { ctx, app } = this
    let tempArticle = ctx.request.body
    const result = await this.app.mysql.insert('article', tempArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    }

  }


  async updateArticle() {
    const { ctx, app } = this
    let tempArticle = ctx.request.body
    const result = await this.app.mysql.update('article', tempArticle)
    const updateSuccess = result.affectedRows === 1

    this.ctx.body = {
      isScuccess: updateSuccess
    }

  }

  async getArticleList() {
    const { ctx, app } = this
    let sql = `SELECT a.id,a.title,
                a.introduce,
                a.releaseTime,
                a.viewCount,
                b.typeName,
                b.orderNum
                FROM article a 
                LEFT JOIN type b 
                ON a.type_id = b.id ORDER BY a.id DESC`
    const results = await app.mysql.query(sql)
    ctx.body = { data: results }
  }

  async delArticle() {
    const { ctx, app } = this
    let id = ctx.params.id
    const res = await app.mysql.delete('article', { 'id': id })
    this.ctx.body = { data: res }
  }

  async getArticleById() {
    const { ctx, app } = this
    let id = ctx.params.id
    let sql = `SELECT a.id,a.title,
                a.article_content as content,
                a.introduce,
                a.releaseTime,
                a.viewCount,
                b.typeName,
                b.id as typeId
                FROM article a 
                LEFT JOIN type b 
                ON a.type_id = b.id where a.id = ${id} `
    const results = await app.mysql.query(sql)
    ctx.body = { data: results[0] }
  }

}

module.exports = AdminController;