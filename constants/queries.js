const GET_ALL_SALES = `SELECT sp.sale_id AS saleId, s.date,
  sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id`;
const GET_SALE_BY_ID = `SELECT s.date, sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  AND s.id = ?
  ORDER BY sp.sale_id, sp.product_id`;
const INSERT_SALE = 'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT)';
const INSERT_SALE_PRODUCT = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
const DELETE_SALE = 'DELETE FROM StoreManager.sales WHERE id = ?';
const DELETE_SALE_PRODUCT = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';

const GET_ALL_PRODUCTS = 'SELECT * FROM StoreManager.products;';
const GET_PRODUCTS_BY_ID = 'SELECT * FROM StoreManager.products WHERE id = ?';
const INSERT_PRODUCT = 'INSERT INTO StoreManager.products (name) VALUES (?)';
const UPDATE_PRODUCT = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
const DELETE_PRODUCT = 'DELETE FROM StoreManager.products WHERE id = ?';

module.exports = {
  GET_ALL_SALES,
  GET_SALE_BY_ID,
  INSERT_SALE,
  INSERT_SALE_PRODUCT,
  DELETE_SALE,
  DELETE_SALE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  INSERT_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
