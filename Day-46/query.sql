-- Luồng chuyển tiền A -> B

BEGIN;

-- 1. Lock 2 ví để tránh race condition
SELECT id, balance
FROM wallets
WHERE id IN (1, 2)
FOR UPDATE;

-- 2. Trừ tiền ví A
UPDATE wallets
SET balance = balance - 100
WHERE id = 1 AND balance >= 100;

-- 3. Check đủ tiền
DO $$
BEGIN
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Insufficient balance';
    END IF;
END $$;

-- 4. Cộng tiền ví B
UPDATE wallets
SET balance = balance + 100
WHERE id = 2;

-- 5. Insert transaction + log
DO $$
DECLARE
    tx_id INT;
BEGIN
    INSERT INTO transactions (
        sender_wallet_id,
        receiver_wallet_id,
        type_id,
        amount,
        note
    )
    VALUES (1, 2, 3, 100, 'Transfer A -> B')
    RETURNING id INTO tx_id;

    INSERT INTO transaction_logs (transaction_id, step, status)
    VALUES (tx_id, 'Transfer completed', 'success');
END $$;

COMMIT;


-- Luồng nạp tiền
BEGIN;

-- 1. Lock ví
SELECT id, balance
FROM wallets
WHERE id = 1
FOR UPDATE;

-- 2. Cộng tiền
UPDATE wallets
SET balance = balance + 200,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- 3. Insert transaction + log
DO $$
DECLARE
    tx_id INT;
BEGIN
    INSERT INTO transactions (
        sender_wallet_id,
        receiver_wallet_id,
        type_id,
        amount,
        note
    )
    VALUES (
        NULL,
        1,
        (SELECT id FROM transaction_types WHERE name = 'deposit'),
        200,
        'Deposit 200 to wallet 1'
    )
    RETURNING id INTO tx_id;

    INSERT INTO transaction_logs (transaction_id, step, status)
    VALUES (tx_id, 'Deposit completed', 'success');
END $$;

COMMIT;
-- Nếu không dùng transaction, crash giữa 2 lệnh UPDATE sẽ khiến tiền bị trừ ở ví A nhưng không được cộng vào ví B → mất tiền và dữ liệu không nhất quán.