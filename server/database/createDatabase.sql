

CREATE DATABASE IF NOT EXISTS `option-strategy`;

DROP TABLE IF EXISTS `option-strategy`.`Strategies`;

CREATE TABLE `option-strategy`.`Strategies` (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  ticker VARCHAR(16),
  strategyDirection VARCHAR(16),
  strategyParsedText VARCHAR(256),
  emailBodyText LONGTEXT,
  createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ticker (ticker),
  INDEX idx_strat (strategy)
) ENGINE=InnoDB;

INSERT INTO `option-strategy`.`Strategies`()
  VALUES(1, '123.123.123.123');


DROP TABLE IF EXISTS `option-strategy`.`MarketData`;
CREATE TABLE `option-strategy`.`MarketData` (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  ticker VARCHAR(16),
  EODDate DATE,
  -- YYY-MM-DD ^
  stockData JSON,
  optionData JSON,
  createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ticker (ticker)
)ENGINE=InnoDB;

-- Only stock market data will be EOD, likely no option data will be stored (maybe EOD)
