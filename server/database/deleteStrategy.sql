USE excel;

DELIMITER //

CREATE OR REPLACE PROCEDURE deleteStrategy (
  IN in_id INTEGER
)

 BEGIN
   DECLARE symbolAssociatedWithID VARCHAR(32);
   DECLARE countStrategiesWithTicker INTEGER;

   -- SET identicalTickerCount = (select count(id) FROM Strategies WHERE ticker=in_symbol);
   SET symbolAssociatedWithID = (SELECT (ticker) FROM Strategies WHERE id=in_id LIMIT 1);
   SET countStrategiesWithTicker = (SELECT count(id) FROM Strategies WHERE ticker=symbolAssociatedWithID);
   DELETE FROM Strategies WHERE id=in_id;

   IF (countStrategiesWithTicker = 1)
    THEN
      DELETE FROM MarketData WHERE `ticker`='symbolAssociatedWithID';
   END IF;
   -- SET identicalSymbolStrategyTitle = (SELECT strategyParsedText FROM Strategies WHERE ticker=in_symbol AND strategyParsedText = in_strategyParsedText LIMIT 1);

   -- IF (identicalTickerCount > 0 AND (identicalSymbolStrategyTitle = in_strategyParsedText))
   -- THEN
   --  SET identicalSymbolID = (select id From Strategies WHERE ticker=in_symbol ORDER BY CreatedDateTime ASC LIMIT 1);
   --  -- UPDATE Strategies SET createdDateTime=NOW() WHERE id=identicalSymbolID;
   -- ELSE
   --  INSERT INTO Strategies (ticker, exchange, strategyDirection, strategyParsedText, emailBodyText)
   --  VALUES(in_symbol, in_exchange, in_strategyDirection, in_strategyParsedText, in_emailBodyText);
   -- END IF;

 END //

DELIMITER ;
