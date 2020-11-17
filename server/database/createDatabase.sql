CREATE USER IF NOT EXISTS 'excel'@'%' IDENTIFIED BY 'A7uSNm4WAGATnoqszG7yhUSp';
GRANT ALL PRIVILEGES ON excel.* TO 'excel'@'%';
FLUSH PRIVILEGES;
--
-- CREATE DATABASE IF NOT EXISTS `excel`;
-- DROP TABLE IF EXISTS `excel`.`Strategies`;
-- CREATE TABLE `excel`.`Strategies` (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   ticker VARCHAR(16),
--   exchange VARCHAR(16),
--   strategyDirection VARCHAR(16),
--   strategyParsedText VARCHAR(256),
--   emailBodyText LONGTEXT,
--   createdDateTime DATETIME DEFAULT NOW(),
--   INDEX idx_ticker (ticker),
--   INDEX idx_strat (strategyDirection)
-- )ENGINE=InnoDB;
--
-- use `excel`.`Strategies`;
-- INSERT INTO `excel`.`Strategies`(ticker, exchange, strategyDirection, strategyParsedText) VALUES('TWTR','NYSE','bullish', '$$_DOWN_DAILY_New Bear Divergence Screener');
-- INSERT INTO `excel`.`Strategies`(ticker, exchange, strategyDirection, strategyParsedText) VALUES('UI','NYSE','bullish', '$$_DOWN_DAILY_New Bear Divergence Screener');

DROP TABLE IF EXISTS `excel`.`MarketData`;
CREATE TABLE `excel`.`MarketData` (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  ticker VARCHAR(16),
  price FLOAT(32),
  momentTime VARCHAR(256),
  createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ticker (ticker)
)ENGINE=InnoDB;

-- use `excel`.`MarketData`
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 45, "9:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 44, "9:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 43.22, "9:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 46.22, "10:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 41.22, "11:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 50, "11:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 50.1, "11:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 38, "11:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 37.22, "11:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 36.22, "12:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 50.22, "12:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 34.22, "12:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 33.22, "12:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 32.22, "12:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 31.22, "12:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 30.22, "13:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 29.22, "13:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 28.22, "13:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 27.22, "13:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 26.22, "13:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 25.22, "13:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 24.22, "14:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 23.22, "14:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('TWTR', 22.22, "14:20 11-2-2020");
--
--
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "9:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "9:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 144.22, "9:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 144.22, "10:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 144.22, "11:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 144.22, "11:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 146.22, "11:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 149.22, "11:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 142.22, "11:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 141.22, "12:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 140.22, "12:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 146.22, "12:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "12:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "12:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "12:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "13:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "13:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "13:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "13:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "13:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "13:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "14:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "14:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "14:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "14:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "14:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "14:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "15:60 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "16:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "16:30 11-2-2020");
--
--
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "16:40 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "16:50 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "17:00 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "17:10 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "17:20 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "17:30 11-2-2020");
-- INSERT INTO `excel`.`MarketData`(ticker, price, momentTime) VALUES('UI', 145.22, "17:40 11-2-2020");
