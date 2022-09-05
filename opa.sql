SELECT am.id,
  am.name,
  cat.name AS category
FROM amenities AS am
  INNER JOIN categories AS cat ON am.category_id = cat.id;