USE excel;

DELIMITER //

CREATE OR REPLACE PROCEDURE insertUnderlying (
  IN in_symbol VARCHAR(16),
  IN in_exchange VARCHAR(16),
  IN in_strategyDirection VARCHAR(16),
  IN in_strategyParsedText VARCHAR(256),
  IN in_emailBodyText LONGTEXT
)

 BEGIN
    -- look for existing tickers of the same symbol, there will be at most 1.
    -- if for some reason there is more than 1, worst case we will insert a duplicate ticker.
    -- IF ticker exists under the same strategy,
      -- get its ID and update it to current date

   DECLARE identicalSymbolID LONGTEXT;
   DECLARE identicalSymbolStrategyTitle TEXT;
   DECLARE identicalTickerCount TINYINT;

   SET identicalTickerCount = (select count(id) FROM Strategies WHERE ticker=in_symbol);

   SET identicalSymbolStrategyTitle = (SELECT strategyParsedText FROM Strategies WHERE ticker=in_symbol AND strategyParsedText = in_strategyParsedText LIMIT 1);

   IF (identicalTickerCount > 0 AND (identicalSymbolStrategyTitle = in_strategyParsedText))
   THEN
    SET identicalSymbolID = (select id From Strategies WHERE ticker=in_symbol ORDER BY CreatedDateTime ASC LIMIT 1);
    UPDATE Strategies SET createdDateTime=NOW() WHERE id=identicalSymbolID;
   ELSE
    INSERT INTO Strategies (ticker, exchange, strategyDirection, strategyParsedText, emailBodyText)
    VALUES(in_symbol, in_exchange, in_strategyDirection, in_strategyParsedText, in_emailBodyText);
   END IF;

 END //

DELIMITER ;

-- CALL simpleProc2('BLOOM', 'NYSE', 'BULLISH', '$$_UP_STRAT', '<body></body>');
