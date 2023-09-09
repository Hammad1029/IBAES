import moment from "moment";
import constants from "../../constants";
import { responseHandler, responses } from "../../utils/responseHandler";
import * as sheets from "../../utils/sheets";
import _ from "lodash";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { userId } = req.body;
      if (!userId) return responseHandler(res, responses.badRequest);

      const headlines = await sheets.readGoogleSheet(sheets.tabs.headlines);

      const currentHeadline = _.first(
        _.orderBy(
          _.filter(headlines, (i) => moment().isSameOrAfter(moment(i.time, constants.dateFormat))),
          [(i) => moment(i.time).format(constants.dateFormat)],
          ["desc"]
        )
      )?.headline;
      const nextHeadline = _.first(
        _.orderBy(
          _.filter(headlines, (i) => moment().isBefore(moment(i.time, constants.dateFormat))),
          [(i) => moment(i.time).format(constants.dateFormat)],
          ["asc"]
        )
      )?.time;

      const balances = await sheets.readGoogleSheet(sheets.tabs.balances);
      const userBal = balances.filter((i) => Number(i.userId) === Number(userId))[0];
      const stocks = await sheets.readGoogleSheet(sheets.tabs.stocks);

      const userBalance = {
        ...userBal,
        initial: userBal.initial,
        remaining: userBal.remaining,
        portfolio: stocks.reduce(
          (sum, i) =>
            sum +
            (Number(userBal[i.companyName.toLowerCase()].replace("%", "")) / 100) *
              Number(i.quantity) *
              Number(i.pricePerShare),
          0
        ),
      };

      return responseHandler(res, responses.success, {
        data: {
          currentHeadline,
          nextHeadline,
          userBalance,
          stocks,
        },
      });
    }
  } catch (e) {
    return responseHandler(res, responses.internalServerError, { error: true, errorMsg: e });
  }
};
