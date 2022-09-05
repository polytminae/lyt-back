import { QueryOptions } from 'mysql2';

export default function checkQuery(query: QueryOptions, path: string) {
  const expected = require('./queries.json')[path];

  return String(query).match(
    RegExp(
      expected
        .replace(/[*()]/g, '\\$&')
        .replace(/\s/g, '\\s*')
        .replace('?', '\\S+')
    )
  );
}
