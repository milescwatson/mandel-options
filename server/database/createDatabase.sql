CREATE USER IF NOT EXISTS 'excel'@'%' IDENTIFIED BY 'A7uSNm4WAGATnoqszG7yhUSp';
GRANT ALL PRIVILEGES ON excel.* TO 'excel'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `excel`;

DROP TABLE IF EXISTS `excel`.`Strategies`;
CREATE TABLE `excel`.`Strategies` (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  ticker VARCHAR(16),
  exchange VARCHAR(16),
  strategyDirection VARCHAR(16),
  strategyParsedText VARCHAR(256),
  emailBodyText LONGTEXT,
  createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ticker (ticker),
  INDEX idx_strat (strategyDirection)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `excel`.`MarketData`;
CREATE TABLE `excel`.`MarketData` (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  ticker VARCHAR(16),
  EODDate DATE,
  price FLOAT(32),
  createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ticker (ticker)
)ENGINE=InnoDB;
