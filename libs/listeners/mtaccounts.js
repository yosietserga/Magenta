import { store } from "../../context/store";
import { isset, empty, log } from "../../utils/common";

store.on("updateAccountsFilters", (o) => {});

store.on("updateAccountsTotals", (o) => {});

store.on("updateAccounts", (o) => {
  if (!Array.isArray(o) || empty(Object.keys(o[0]))) {
    store.set("accounts_totals", {});
    store.emit("updateAccountsTotals", {});
  } else {
    let maxLoser;
    let maxWinner;
    let loser = 0;
    let winner = 0;

    let totalProfit = 0;
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

    const longs = [];
    const shorts = [];

    //sum
    const sumDeposits = (p) => (totalDeposits = totalDeposits * 1 + p * 1);
    const sumNetProfit = (p) => (totalProfit = totalProfit * 1 + p * 1);
    const sumGrossProfit = (p) => (grossProfit = grossProfit * 1 + p * 1);
    const sumGrossLoss = (p) => (grossLoss = grossLoss * 1 + p * 1);
    //counters
    const countGainers = () => totalGainers++;
    const countLosers = () => totalLosers++;
    const countPositions = () => totalPositions++;
    const countLongPositions = () => totalLongPositions++;
    const countShortPositions = () => totalShortPositions++;

    const topGainer = (pl, order) => {
      if (!maxWinner || winner < pl) {
        maxWinner = order;
        winner = pl;
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

      const profit_lose =
        order.profit * 1 + order.commission * 1 + order.swap * 1;

      sumNetProfit(profit_lose);
      countPositions();

      if (profit_lose > 0) {
        sumGrossProfit(profit_lose);
        countGainers();
        topGainer(profit_lose, order);
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
      balance,

      grossProfit,
      grossLoss,
      totalProfit,
      profit_factor,
      avg_profit_factor,
      risk_factor,

      hhProfitLoss,
      hlProfitLoss,
      mdd,
      mdd_percent,

      consecutiveLosers,
      consecutiveWinners,

      totalGainers,
      totalLosers,
      totalPositions,
      totalLongPositions,
      totalShortPositions,

      longs,
      shorts,

      maxLoser,
      maxWinner,

      initialDeposit,
      deposits,
      totalDeposits,
    };

    store.set("accounts", o);
    store.set("accounts_totals", totals);
    store.emit("updateAccountsTotals", totals);
  }
});