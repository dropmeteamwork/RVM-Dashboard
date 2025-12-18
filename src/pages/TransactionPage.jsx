import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import ReferralCard from "../components/ReferralCard";
import VoucherCard from "../components/VoucherCard";
import AnalyticsCard from "../components/AnalyticsCard";
import UserTransaction from "../components/UserTransaction";
import { getTransactionAnalytics } from "../services/api";
import PointsVsCouponsChart from "../components/Charts/PointsVsCouponsChart";

export default function TransactionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [months, setMonths] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionAnalytics();
        console.log(response.data);

        setData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.message ||
            "A network or server error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [months]);

  useEffect(() => {
    if (data && data.Transaction_Details_section) {
      const filtered = data.Transaction_Details_section.filter((transaction) =>
        transaction.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  }, [searchTerm, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p className="text-lg font-medium">Error: {error} </p>
      </div>
    );
  }

  return (
    <>
      <div className={`card bg-base-100 shadow-sm`}>
        <div className="card-body">
          <div className="pb-5 flex flex-col md:flex-row gap-4 md:justify-between">
            <div>
              <h2 className="font-semibold text-xl mb-2">
                Recent Transactions{" "}
              </h2>
              <p className="text-gray-500">
                Latest recycling activities and transactions{" "}
              </p>
            </div>
            <div className="max-w-[260px] self-end">
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  className="grow"
                  placeholder="Search by username"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <UserTransaction
                  key={index}
                  name={transaction.username}
                  points={transaction.points}
                  productName={transaction.product_name}
                  couponValue={transaction.coupon_value}
                  code={transaction.coupon_code}
                  date={transaction.created_at}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No transactions found.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsCard
          title="Referral System Performance"
          subTitle="User acquisition through referrals"
        >
          <div className="flex justify-between items-center">
            <div className="flex-1 text-center p-4 ">
              <h3 className="font-bold text-2xl text-blue-600">
                {data.Referral_System_Performance_section.total_referrals}
              </h3>
              <p className="text-gray-500 ">Total Referrals</p>
            </div>
            <div className="flex-1 text-center p-4 ">
              <h3 className="font-bold text-2xl text-primary-color">
                {data.Referral_System_Performance_section.conversion_rate}
              </h3>
              <p className="text-gray-500 ">Conversion Rate</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Top Referrers</h3>
            <div>
              {data.Referral_System_Performance_section.top_referrers.map(
                (data, index) => (
                  <div className="flex justify-between items-center mb-1">
                    <p className="">{data.username}</p>
                    <span className="text-sm font-medium">
                      {data.referral_usage_count} referrals •{" "}
                      {data.total_referral_points} pts
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </AnalyticsCard>
        <AnalyticsCard
          title="Voucher System Performance"
          subTitle="Points vs coupons redemption"
        >
          <div className="flex justify-between items-center">
            <div className="flex-1 text-center p-4 ">
              <h3 className="font-bold text-2xl text-purple-600">
                {data.Voucher_System_Performance_section.total_coupons_issued}
              </h3>
              <p className="text-gray-500 ">Vouchers Issued</p>
            </div>
            <div className="flex-1 text-center p-4 ">
              <h3 className="font-bold text-2xl text-orange-500">
                {data.Voucher_System_Performance_section.redemption_rate}
              </h3>
              <p className="text-gray-500 ">Redemption Rate</p>
            </div>
          </div>
          <div className="flex-1 text-center p-4 ">
            <h3 className="font-bold text-2xl text-primary-color">
              {data.Voucher_System_Performance_section.total_values_redeemed}
            </h3>
            <p className="text-gray-500 ">Total Value Redeemed</p>
          </div>
        </AnalyticsCard>
        <AnalyticsCard
          title={"Points vs Coupons Trends"}
          subTitle={"Monthly comparison of points and coupon usage"}
        >
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setMonths(6)}
              className={`px-3 py-1 cursor-pointer rounded ${
                months === 6 ? "bg-primary-color text-white" : "bg-gray-200"
              }`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setMonths(12)}
              className={`px-3 py-1 cursor-pointer rounded ${
                months === 12 ? "bg-primary-color text-white" : "bg-gray-200"
              }`}
            >
              Last 12 Months
            </button>
          </div>
          {data && data.Point_vs_Coupons_section ? (
            <PointsVsCouponsChart
              pointsCouponsData={data.Point_vs_Coupons_section}
            />
          ) : (
            <p className="text-center text-gray-500">
              No points vs coupons data available.
            </p>
          )}
        </AnalyticsCard>
      </div>
    </>
  );
}
