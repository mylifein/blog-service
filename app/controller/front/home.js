'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const { ctx, app } = this;
    let result = await app.mysql.get('blog_content', {})
    console.log(result);
    ctx.body = result
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
                ON a.type_id = b.id `
    const results = await app.mysql.query(sql)
    ctx.body = { data: results }
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

  // 得到类别名称和编号
  async getTypeInfo() {
    const { ctx, app } = this
    const results = await app.mysql.select('type')
    this.ctx.body = { data: results }
  }

  // 根据类别ID获得文章列表
  async getArticsByTypeId() {
    const { ctx, app } = this
    let typeId = ctx.params.id
    let sql = `SELECT a.id,a.title,
                a.introduce,
                a.releaseTime,
                a.viewCount,
                b.typeName,
                b.orderNum
                FROM article a 
                LEFT JOIN type b 
                ON a.type_id = b.id where b.id = ${typeId}`
    const results = await app.mysql.query(sql)
    ctx.body = { data: results }
  }

}

module.exports = HomeController;
