BEGIN;

DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  URL TEXT NOT NULL,
  keywords TEXT,
);

INSERT INTO resources (title, URL, keywords) VALUES ('Callback HELL', 'http://callbackhell.com/', 'callback, js'), ('Node.js Async Best Practices & Avoiding the Callback Hell', 'https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/', 'node, async, callback');

COMMIT;
