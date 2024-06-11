const ARTICLE_CATEGORIES = process.env.ARTICLE_CATEGORIES.split(',');

const umumIndex = ARTICLE_CATEGORIES.findIndex(
  (category) => category === 'Umum'
);

if (umumIndex === -1) ARTICLE_CATEGORIES.push('Umum');

module.exports = {
  ARTICLE_CATEGORIES,
};
