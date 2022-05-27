import moment from "moment";
import { store } from "../../context/store";
import { isset, empty, log } from "../../utils/common";

store.on("updateOrdersFilters", (o) => {});

store.on("updateOrdersTotals", (o) => {});

store.on("updateOrders", (o) => {
  if (!Array.isArray(o) || empty(Object.keys(o[0]))) {
    store.set("orders_totals", {});
    store.emit("updateOrdersTotals", {});
  } else {
    const perItem = {};

    let firstBotTrade;
    let lastBotTrade;
    let initialBalanceBot=0;
    const botFloatingOrders=[];

    let maxLoser;
    let maxWinner;
    let maxFloatingWinner;
    let maxFloatingLoser;
    let loser = 0;
    let winner = 0;
    let floatingWinner = 0;
    let floatingLoser = 0;

    let totalFloatingProfit = 0;
    let totalProfit = 0;
    let totalSwap = 0;
    let totalSize = 0;
    let grossProfit = 0;
    let grossLoss = 0;

    let hhProfitLoss = 0;
    let hlProfitLoss = 0;
    let mdd = 0;
    let mdd_percent = 0;

    let totalGainers = 0;
    let totalLosers = 0;
    let totalPositions = 0;
    let totalLongPositions = 0;
    let totalShortPositions = 0;

    let totalDeposits = 0;
    let initialDeposit;
    const deposits = [];
    const floatingOrders = [];
    const longs = [];
    const shorts = [];

    //sum
    const sumDeposits = (p) => (totalDeposits = totalDeposits * 1 + p * 1);
    const sumNetProfitFloating = (p) => (totalFloatingProfit = totalFloatingProfit * 1 + p * 1);
    const sumNetProfit = (p) => (totalProfit = totalProfit * 1 + p * 1);
    const sumNetSwap = (p) => (totalSwap = totalSwap * 1 + p * 1);
    const sumNetSize = (p) => (totalSize = totalSize * 1 + p * 1);
    const sumGrossProfit = (p) => (grossProfit = grossProfit * 1 + p * 1);
    const sumGrossLoss = (p) => (grossLoss = grossLoss * 1 + p * 1);
    //counters
    const countGainers = () => totalGainers++;
    const countLosers = () => totalLosers++;
    const countPositions = () => totalPositions++;
    const countLongPositions = () => totalLongPositions++;
    const countShortPositions = () => totalShortPositions++;

    const topFloatingGainer = (pl, order) => {
      if (!maxFloatingWinner || floatingWinner < pl) {
        maxFloatingWinner = order;
        floatingWinner = pl;
      }
    };

    const topGainer = (pl, order) => {
      if (!maxWinner || winner < pl) {
        maxWinner = order;
        winner = pl;
      }
    };

    const topFloatingLoser = (pl, order) => {
      if (!maxFloatingLoser || floatingLoser < pl) {
        maxFloatingLoser = order;
        floatingLoser = pl;
      }
    };

    const topLoser = (pl, order) => {
      if (!maxLoser || loser < pl) {
        maxLoser = order;
        loser = pl;
      }
    };

    for (let i in o) {
      let order = o[i];
      if (order.type === "deposit") {
        sumDeposits(order.profit);
        deposits.push(order);
        if (!initialDeposit) initialDeposit = order;
      }
    }

    let consecutiveLosers = [];
    let consecutiveWinners = [];
    let consecutiveHelperLosers = [];
    let consecutiveHelperWinners = [];

    const resetConsecutiveLoser = () => {
      consecutiveHelperLosers = [];
    };

    const addConsecutiveLoser = (order) => {
      consecutiveHelperLosers.push(order);
    };

    const resetConsecutiveWinner = () => {
      consecutiveHelperWinners = [];
    };

    const addConsecutiveWinner = (order) => {
      consecutiveHelperWinners.push(order);
    };

    for (let i in o) {
      let order = o[i];

      if (order.type === "buy") {
        countLongPositions();
        longs.push(order);
      } else if (order.type === "sell") {
        countShortPositions();
        shorts.push(order);
      } else {
        continue;
      }

      //initiate item 
      perItem[order.item] = perItem[order.item] ?? {};

      if (!order.closeTime || order.closeTime.indexOf("1970") !== -1)
        floatingOrders.push(order);

      if (
        isset(order.magicNumber) 
        && 
        (
          !empty(order.magicNumber)
          || order.comment == "BenderFX_AgressiveFibo_60"
        )
      ) {
        if (!order.closeTime || order.closeTime.indexOf("1970") !== -1)
          botFloatingOrders.push(order);
        
        if (!firstBotTrade) {
          firstBotTrade = order;
          initialBalanceBot = totalDeposits + totalProfit;
        } else if (moment(order.openTime).isBefore(firstBotTrade.openTime)) {
          firstBotTrade = order;
        }
        if (!lastBotTrade) {
          lastBotTrade = order;
        } else if (moment(order.openTime).isAfter(lastBotTrade.openTime)) {
          lastBotTrade = order;
        }
      }
      console.log(
        "closeTime",
        order.ticket,
        order.closeTime.indexOf("1970") !== -1
      );

      const profit_lose =
        order.profit * 1 + order.commission * 1 + order.swap * 1;

      sumNetProfit(profit_lose);
      sumNetSwap(order.swap);
      sumNetSize(order.size);
      
      if (!order.closeTime || order.closeTime.indexOf("1970") !== -1) {
        sumNetProfitFloating(profit_lose);
      }

      countPositions();

      if (profit_lose > 0) {
        sumGrossProfit(profit_lose);
        countGainers();
        topGainer(profit_lose, order);
        
        if (!order.closeTime || order.closeTime.indexOf("1970") !== -1) {
          topFloatingGainer(profit_lose, order);
        }

        hhProfitLoss = Math.max(hhProfitLoss, totalProfit);

        resetConsecutiveLoser();
        addConsecutiveWinner(order);
        if (consecutiveWinners.length < consecutiveHelperWinners.length) {
          consecutiveWinners = consecutiveHelperWinners;
        }
      } else {
        sumGrossLoss(profit_lose);
        countLosers();
        topLoser(profit_lose, order);
        
        if (!order.closeTime || order.closeTime.indexOf("1970") !== -1) {
          topFloatingLoser(profit_lose, order);
        }

        hlProfitLoss = Math.min(hlProfitLoss, totalProfit);

        resetConsecutiveWinner();
        addConsecutiveLoser(order);
        if (consecutiveLosers.length < consecutiveHelperLosers.length) {
          consecutiveLosers = consecutiveHelperLosers;
        }

        const _toCalcMDD = hhProfitLoss - totalProfit;
        if (mdd < _toCalcMDD) {
          mdd = _toCalcMDD;
          mdd_percent =
            totalDeposits + hhProfitLoss <= 0
              ? 100
              : (100 * mdd) / (totalDeposits + hhProfitLoss);
        }        
      }

      order.pl = profit_lose;

      
      if (!isset(perItem[order.item])) perItem[order.item] = {};
      if (!isset(perItem[order.item].orders)) perItem[order.item].orders = [];

      perItem[order.item].orders.push(order);

      perItem[order.item].profit = !isset(perItem[order.item].profit)
        ? profit_lose
        : perItem[order.item].profit * 1 + profit_lose * 1;


      perItem[order.item].profitPercent = !isset(perItem[order.item].profitPercent)
        ? parseFloat( perItem[order.item].profit / totalProfit * 100 ).toFixed(2)
        : perItem[order.item].profitPercent = parseFloat( (perItem[order.item].profit / totalProfit) * 100 ).toFixed(2);

      o[i] = order;
    }

    const profit_factor = Math.abs(grossProfit / grossLoss);
    const avg_profit_factor =
      grossLoss * totalGainers == 0
        ? "*"
        : Math.abs((grossProfit * totalLosers) / (grossLoss * totalGainers));

    const risk_factor = mdd == 0 ? "*" : (grossProfit + grossLoss) / mdd;
    const balance = totalDeposits + totalProfit;

    const totals = {
      account: o.account,
      balance,

      //first and last bot order opened
      firstBotTrade,
      lastBotTrade,
      initialBalanceBot,
      botFloatingOrders,
      grossProfit,
      grossLoss,
      totalFloatingProfit,
      totalProfit,
      totalSwap,
      totalSize,
      profit_factor,
      avg_profit_factor,
      risk_factor,

      hhProfitLoss,
      hlProfitLoss,
      mdd,
      mdd_percent,

      consecutiveLosers,
      consecutiveWinners,
      perItem,

      totalGainers,
      totalLosers,
      totalPositions,
      totalLongPositions,
      totalShortPositions,

      longs,
      shorts,
      floatingOrders,

      maxLoser,
      maxWinner,
      maxFloatingWinner,
      maxFloatingLoser,

      initialDeposit,
      deposits,
      totalDeposits,
    };

    store.set("orders", o);
    store.set("orders_totals", totals);
    store.emit("updateOrdersTotals", totals);
  }
});