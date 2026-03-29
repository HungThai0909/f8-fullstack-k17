-- 1. Tính tổng doanh thu của hệ thống
-- Sửa cấu trúc bảng order_items
ALTER TABLE order_items
ADD COLUMN price_at_purchase DECIMAL(10, 2);

-- Update dữ liệu cho cột price_at_purchase
UPDATE order_items
SET price_at_purchase = products.current_price
FROM products
WHERE order_items.product_id = products.id;

-- Tính tổng tiền đơn hàng sử dụng cột mới
SELECT orders.id, SUM(order_items.quantity * order_items.price_at_purchase) AS total_amount
FROM orders
JOIN order_items
ON  orders.id = order_items.order_id
GROUP BY orders.id
ORDER BY orders.id

-- 2. Lấy ra 5 khách hàng chi tiêu nhiều nhất trong tháng 1/2026

SELECT users.id, users.full_name, SUM(order_items.quantity * order_items.price_at_purchase) AS total_spent
FROM users
JOIN orders
ON users.id = orders.user_id
JOIN order_items
ON orders.id = order_items.order_id
WHERE orders.status = 'completed' AND orders.order_date >= '2026-01-01' AND orders.order_date < '2026-02-01'
GROUP BY users.id, users.full_name
ORDER BY total_spent DESC
LIMIT 5

-- 3. Lấy ra 5 user có số lượng bình luận nhiều nhất trong tháng 1/2026

SELECT users.id, users.full_name, COUNT(comments.id) AS total_comments
FROM users
JOIN comments
ON users.id = comments.user_id
WHERE comments.created_at >= '2026-01-01' AND comments.created_at < '2026-02-01'
GROUP BY users.id, users.full_name
ORDER BY total_comments DESC
LIMIT 5

-- 4. Lấy ra tất cả sản phẩm kèm số lượng bình luận

SELECT products.id, products.name, products.current_price, COUNT(comments.id) as total_comments
FROM products
LEFT JOIN comments
ON products.id = comments.product_id
GROUP BY products.id, products.name, products.current_price
ORDER BY total_comments DESC

-- 5. Lấy ra các khách hàng có tổng chi tiêu lớn hơn mức chi tiêu trung bình

SELECT *
FROM (
    SELECT users.id, users.full_name, SUM(order_items.quantity * order_items.price_at_purchase) AS total_spent, AVG(SUM(order_items.quantity * order_items.price_at_purchase)) OVER () AS avg_spent
    FROM users
    JOIN orders
    ON users.id = orders.user_id
    JOIN order_items
    ON orders.id = order_items.order_id
    WHERE orders.status = 'completed' AND orders.order_date >= '2026-01-01' AND orders.order_date < '2026-02-01'
    GROUP BY users.id, users.full_name
     )
WHERE total_spent > avg_spent
ORDER BY total_spent DESC

-- 6. Với mỗi danh mục, tìm sản phẩm có tổng số lượng bán ra nhiều nhất

SELECT products.category, products.name, SUM(order_items.quantity) AS total_quantity
FROM products
JOIN order_items
ON products.id = order_items.product_id
JOIN orders
ON order_items.order_id = orders.id
WHERE orders.status = 'completed'
GROUP BY products.category, products.name
HAVING SUM(order_items.quantity) = (
    SELECT MAX(total_quantity)
    FROM (
        SELECT products.category, products.name, SUM(order_items.quantity) AS total_quantity
        FROM products
        JOIN order_items
        ON products.id = order_items.product_id
        JOIN orders
        ON order_items.order_id = orders.id
        WHERE orders.status = 'completed'
        GROUP BY products.category, products.name
    ) t
    WHERE t.category = products.category
)

-- 7. Tạo một báo cáo tổng hợp cho từng khách hàng

SELECT users.full_name, (
    SELECT COUNT(*)
    FROM orders
    WHERE orders.user_id = users.id AND orders.status = 'completed' AND orders.order_date >= '2026-01-01' AND orders.order_date < '2026-02-01'
    ) AS total_orders,
    (
    SELECT COALESCE(SUM(order_items.quantity * order_items.price_at_purchase), 0)
    FROM orders
    JOIN order_items
    ON orders.id = order_items.order_id
    WHERE orders.user_id = users.id AND orders.status = 'completed' AND orders.order_date >= '2026-01-01' AND orders.order_date < '2026-02-01'
    ) AS total_spent,
    (
    SELECT COUNT(*)
    FROM comments
    WHERE comments.user_id = users.id AND comments.created_at >= '2026-01-01' AND comments.created_at < '2026-02-01'
    ) AS total_comments,
    (
    SELECT COALESCE(SUM(order_items.quantity * order_items.price_at_purchase), 0) / NULLIF(COUNT(DISTINCT orders.id), 0)
    FROM orders
    JOIN order_items
    ON orders.id = order_items.order_id
    WHERE orders.user_id = users.id AND orders.status = 'completed' AND orders.order_date >= '2026-01-01' AND orders.order_date < '2026-02-01'
    ) AS avg_order_value
FROM users
ORDER BY total_spent DESC

-- 8. Tìm các sản phẩm chưa từng được bán

SELECT products.id, products.name, products.current_price, products.category
FROM products
LEFT JOIN order_items
ON products.id = order_items.product_id
WHERE order_items.product_id IS NULL

-- 9. Tính doanh thu theo từng tháng

SELECT
    EXTRACT(MONTH FROM t.order_date) AS month,
    EXTRACT(YEAR FROM t.order_date) AS year,

    SUM(t.order_total) AS total_revenue,
    COUNT(*) AS total_orders,
    SUM(t.order_total) / COUNT(*) AS avg_order_value
FROM (
    SELECT orders.id, orders.order_date,
        SUM(order_items.quantity * order_items.price_at_purchase) AS order_total
    FROM orders
    JOIN order_items
    ON orders.id = order_items.order_id
    WHERE orders.status = 'completed' AND orders.order_date >= '2025-12-01' AND orders.order_date < '2026-02-01'
    GROUP BY orders.id, orders.order_date
) t

GROUP BY EXTRACT(YEAR FROM t.order_date), EXTRACT(MONTH FROM t.order_date)
ORDER BY year, month;

-- 10. Tìm khách hàng trung thành

SELECT users.full_name, COUNT(DISTINCT orders.id) AS total_orders, SUM(order_items.quantity * order_items.price_at_purchase) AS total_spent
FROM users
JOIN orders
ON users.id = orders.user_id
JOIN order_items
ON orders.id = order_items.order_id
WHERE orders.status = 'completed' AND orders.order_date >= '2026-01-01' AND orders.order_date < '2026-02-01'
GROUP BY users.id, users.full_name
HAVING COUNT(DISTINCT orders.id) >= 2 AND SUM(order_items.quantity * order_items.price_at_purchase) >= 30000000
ORDER BY total_spent DESC;