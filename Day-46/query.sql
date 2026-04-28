-- Luồng chuyển tiền A -> B

BEGIN;

-- 1. Lock 2 ví để tránh race condition
SELECT id, balance
FROM wallets
WHERE id IN (1, 2)
FOR UPDATE;

-- 2. Trừ tiền + check số dư trong cùng block
DO $$
DECLARE
  d INT;
BEGIN
  UPDATE wallets
  SET balance = balance - 100,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = 1 AND balance >= 100;

  GET DIAGNOSTICS d = ROW_COUNT;

  IF d = 0 THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;
END $$;

-- 3. Cộng tiền ví B (có updated_at)
UPDATE wallets
SET balance = balance + 100,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 2;

-- 4. Insert transaction + log (fix type_id)
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
        1,
        2,
        (SELECT id FROM transaction_types WHERE name = 'transfer'),
        100,
        'Transfer A -> B'
    )
    RETURNING id INTO tx_id;

    INSERT INTO transaction_logs (transaction_id, step, status)
    VALUES (tx_id, 'Transfer completed', 'success');
END $$;

COMMIT;
-- Nếu không dùng transaction, crash giữa 2 lệnh UPDATE sẽ khiến tiền bị trừ ở ví A nhưng không được cộng vào ví B → mất tiền và dữ liệu không nhất quán.