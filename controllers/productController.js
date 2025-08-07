const db = require('../db');

exports.list = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
const offset = 0; // or dynamic as per pagination

const sql = `
  SELECT 
    p.prod_id AS prod_id, 
    p.prod_name AS prod_name, 
    c.category_id AS category_id, 
    c.category_name AS category_name
  FROM product p
  JOIN category c ON p.category_id = c.category_id
  LIMIT ? OFFSET ?
`;

db.query(sql, [limit, offset], (err, results) => {
  if (err) throw err;
  // render or return results
});

  db.query(countQuery, (err, countResult) => {
    if (err) throw err;
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query('SELECT * FROM category', (err, categories) => {
      if (err) throw err;

      db.query(dataQuery, [limit, offset], (err, results) => {
        if (err) throw err;
        res.render('product', {
          products: results,
          categories: categories,
          currentPage: page,
          totalPages: totalPages
        });
      });
    });
  });
};

exports.add = (req, res) => {
  const { name, category_id } = req.body;
  db.query('INSERT INTO product (name, category_id) VALUES (?, ?)', [name, category_id], () => {
    res.redirect('/product');
  });
};

exports.update = (req, res) => {
  const { name, category_id } = req.body;
  db.query('UPDATE product SET name = ?, category_id = ? WHERE id = ?', [name, category_id, req.params.id], () => {
    res.redirect('/product');
  });
};

exports.delete = (req, res) => {
  db.query('DELETE FROM product WHERE id = ?', [req.params.id], () => {
    res.redirect('/product');
  });
};
