const ServerError = require('../../exceptions/ServerError');

const { Article, ArticleBody, sequelize } = require('../../../db/models');
const NotFoundError = require('../../exceptions/NotFoundError');

class ArticlesService {
  async addArticle(payload) {
    const { title, referenceUrl, bodies, author } = payload;

    // db transaction
    const t = await sequelize.transaction();

    try {
      const article = await Article.create(
        { title, referenceUrl, author },
        { transaction: t }
      );

      const articleId = article.id;

      const articleBodies = bodies.map((body) => ({
        articleId,
        body,
      }));

      await ArticleBody.bulkCreate(articleBodies, { transaction: t });

      await t.commit();

      return article;
    } catch (error) {
      throw new ServerError('Internal server error');
    }
  }

  async getArticles() {
    const articles = await Article.findAll({
      attributes: ['id', 'title', 'referenceUrl', 'imageUrl', 'author'],
    });

    return articles;
  }

  async checkArticleId(id) {
    const article = await Article.findByPk(id);

    if (!article) {
      throw new NotFoundError('Article not found');
    }
  }

  async getArticleById(id) {
    const article = await Article.findByPk(id, {
      attributes: ['id', 'title', 'referenceUrl', 'imageUrl', 'author', 'createdAt'],
    });

    const articleBodies = await ArticleBody.findAll({
      where: {
        articleId: id,
      },
      attributes: ['body'],
    });

    article.dataValues.bodies = articleBodies.map((body) => body.body);

    return article;
  }

  async updateArticleImage(id, imageUrl) {
    await Article.update({ imageUrl }, { where: { id } });
  }

  async updateArticleById(id, payload) {
    const { title, referenceUrl, bodies, author } = payload;

    const t = await sequelize.transaction();

    try {
      await Article.update(
        { title, referenceUrl, author },
        { where: { id }, transaction: t }
      );

      const articleBodies = bodies.map((body) => ({
        articleId: id,
        body,
      }));

      await ArticleBody.destroy({ where: { articleId: id }, transaction: t });

      await ArticleBody.bulkCreate(articleBodies, { transaction: t });

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new ServerError('Internal server error');
    }
  }

  async deleteArticleById(id) {
    const t = await sequelize.transaction();

    try {
      await ArticleBody.destroy({ where: { articleId: id }, transaction: t });
      await Article.destroy({ where: { id }, transaction: t });

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new ServerError('Internal server error');
    }
  }
}

module.exports = ArticlesService;
