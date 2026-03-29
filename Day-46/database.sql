--Tạo bảng wallets
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    balance NUMERIC(18,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng transaction_types
CREATE TABLE transaction_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
-- insert
INSERT INTO transaction_types (name) VALUES
('deposit'),
('withdraw'),
('transfer');

-- 3. Bảng transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sender_wallet_id INT,
    receiver_wallet_id INT,
    type_id INT NOT NULL,
    amount NUMERIC(18,2) NOT NULL CHECK (amount > 0),
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sender_wallet
        FOREIGN KEY (sender_wallet_id)
        REFERENCES wallets(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_receiver_wallet
        FOREIGN KEY (receiver_wallet_id)
        REFERENCES wallets(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_transaction_type
        FOREIGN KEY (type_id)
        REFERENCES transaction_types(id)
);
-- 4. Bảng transaction_logs
CREATE TABLE transaction_logs (
    id SERIAL PRIMARY KEY,
    transaction_id INT NOT NULL,
    step VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('success', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transaction
        FOREIGN KEY (transaction_id)
        REFERENCES transactions(id)
        ON DELETE CASCADE
);

-- Dùng NUMERIC(18, 2) cho các cột tiền tệ, không dùng FLOAT hay DOUBLE vì:

-- NUMERIC lưu số chính xác tuyệt đối (exact precision).
-- FLOAT/DOUBLE là số xấp xỉ do biểu diễn nhị phân, có thể gây sai số.
-- Trong hệ thống tài chính, sai số dù nhỏ cũng không chấp nhận được.

-- Cần lưu balance vì:
-- Nếu không lưu, mỗi lần cần số dư phải SUM từ transactions (O(n)) → rất chậm khi dữ liệu lớn.
-- Ví điện tử cần hiển thị số dư real-time.
-- Balance là trạng thái hiện tại, transactions là lịch sử.
-- Lưu balance để truy vấn nhanh và ổn định.