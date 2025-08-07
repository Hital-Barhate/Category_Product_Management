const db = require('../db');

exports.list = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  // First: Get total count for pagination
  db.query('SELECT COUNT(*) AS count FROM category', (err, countResult) => {
    if (err) throw err;

    const totalRecords = countResult[0].count;
    const totalPages = Math.ceil(totalRecords / limit);

    // Second: Get paginated records
    db.query('SELECT * FROM category LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) throw err;

      res.render('category', {
        categories: results,
        currentPage: page,
        totalPages: totalPages
      });
    });
  });
};


exports.add = (req, res) => {
  const { category_name } = req.body; // updated from name → category_name
  const sql = 'INSERT INTO category (category_name) VALUES (?)';
  db.query(sql, [category_name], (err) => {
    if (err) throw err;
    res.redirect('/category');
  });
};


exports.editForm = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM category WHERE category_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching category:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length > 0) {
      res.render('editform', { category: results[0] }); 
    } else {
      res.status(404).send('Category not found');
    }
  });
};


// Update category name
exports.update = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  const sql = 'UPDATE category SET category_name = ? WHERE category_id = ?';
  db.query(sql, [category_name, id], (err) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).send('Error updating category');
    }
    res.redirect('/category');
  });
};


exports.delete = (req, res) => {
  db.query('DELETE FROM category WHERE category_id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).send('Error deleting category');
    }
    res.redirect('/category');
  });
};
