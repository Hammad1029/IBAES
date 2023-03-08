import _ from "lodash";
import moment from "moment";
import constants from "../../constants";
import { camelCaseToNormal } from "../../utils";
import { responseHandler, responses } from "../../utils/responseHandler";
import * as sheets from "../../utils/sheets";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { userId, quantity, buySell, pricePerShare, companyName } = req.body;
      if (!userId || !quantity || !buySell || !pricePerShare || !companyName)
        return responseHandler(res, responses.badRequest, { error: true });

      const order = {
        companyName,
        type: buySell,
        dateTime: moment().format(constants.dateFormatWS),
        price: pricePerShare,
        quantity,
        userId,
      };
      await sheets.writeGoogleSheet(sheets.tabs.orders, order);

      const buySellType = buySell.toLowerCase();

      const stocks = await sheets.readGoogleSheet(sheets.tabs.stocks);
      const stockIndex = _.findIndex(stocks, { companyName });
      stocks[stockIndex].sold =
        buySellType === "buy"
          ? Number(stocks[stockIndex].sold) + Number(quantity)
          : Number(stocks[stockIndex].sold) - Number(quantity);
      await sheets.updateGoogleSheet(sheets.tabs.stocks, stocks);

      const balances = await sheets.readGoogleSheet(sheets.tabs.balances);
      const balanceIndex = _.findIndex(balances, { userId });
      balances[balanceIndex].remaining =
        buySellType === "buy"
          ? Number(balances[balanceIndex].remaining) -
            Number(quantity) * Number(pricePerShare).toFixed(2)
          : Number(balances[balanceIndex].remaining) +
            Number(quantity) * Number(pricePerShare).toFixed(2);
      const userOwnershipQuantity =
        (Number(balances[balanceIndex][companyName.toLowerCase()].replace("%", "")) / 100) *
        stocks[stockIndex].quantity;
      balances[balanceIndex][companyName.toLowerCase()] =
        parseFloat(
          ((buySellType === "buy"
            ? Number(userOwnershipQuantity) + Number(quantity)
            : Number(userOwnershipQuantity) - Number(quantity)) /
            Number(stocks[stockIndex].quantity)) *
            100
        ).toFixed(2) + "%";
      await sheets.updateGoogleSheet(sheets.tabs.balances, balances);

      return responseHandler(res, responses.success, { data: stocks });
    }
  } catch (e) {
    return responseHandler(res, responses.internalServerError, { error: true, errorMsg: e });
  }
};
