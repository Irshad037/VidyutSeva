
import React, { useState } from "react";
import {
  ReceiptText,
  Search,
  Zap,
  CreditCard,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  IndianRupee,
} from "lucide-react";
import Layout from "../../../layouts/Layout";

const PayBill = () => {
  const [consumerType, setConsumerType] = useState("LT Consumer");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [bill, setBill] = useState(null);

  const [error, setError] = useState("");

  const handleFetchBill = (e) => {
    e.preventDefault();
    setError("");
    setBill(null);

    if (!/^\d{12}$/.test(consumerNumber)) {
      setError("Please enter a valid 12-digit consumer number.");
      return;
    }

    // DEMO ONLY: Replace with your electricity provider's bill API.
    setBill({
      consumerName: "Demo Consumer",
      consumerNumber,
      billingPeriod: "September 2026",
      dueDate: "25 October 2026",
      units: 245,
      amount: 1840,
      status: "Unpaid",
    });
  };

  const handleClear = () => {
    setConsumerType("LT Consumer");
    setConsumerNumber("");
    setBill(null);
    setError("");
  };

  const handlePayment = () => {
    alert(
      "Payment gateway integration is required to process the actual payment."
    );
  };

  const inputClass =
    "w-full rounded-xl border border-[#D8C6E4] bg-[#FCF6E9] px-4 py-3 text-sm text-[#2D103B] outline-none focus:border-[#61197B] focus:ring-2 focus:ring-[#61197B]/10";

  return (
    <Layout currTitle="View/Pay Bill">

      <div className="min-h-screen bg-[#F7F2E8] px-4 py-5 pb-10 md:px-8 lg:px-10 fontcorm">
      {/* Header */}
      <div>
        <p className="text-sm text-[#6B4C7B]">
          Citizen services / Electricity billing
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#2D103B] md:text-4xl">
          View & Pay Bill
        </h1>

        <p className="mt-3 text-[#5E4A67]">
          Check your electricity bill, view the amount due, and make a payment.
        </p>
      </div>

      {/* Main Layout */}
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Bill Search Form */}
        <section className="overflow-hidden rounded-3xl border border-[#D8C6E4] bg-[#FFFEF6] shadow-sm">
          <div className="flex items-center gap-3 bg-[#61197B] px-5 py-4 text-white">
            <ReceiptText size={22} />
            <div>
              <h2 className="font-bold">View my dues</h2>
              <p className="mt-1 text-xs text-purple-100">
                Enter your electricity connection details
              </p>
            </div>
          </div>

          <form onSubmit={handleFetchBill} className="space-y-5 p-5 md:p-7">
            {/* Consumer Type */}
            <div>
              <label
                htmlFor="consumerType"
                className="mb-2 block text-sm font-semibold text-[#2D103B]"
              >
                Consumer type <span className="text-red-600">*</span>
              </label>

              <select
                id="consumerType"
                value={consumerType}
                onChange={(e) => setConsumerType(e.target.value)}
                className={inputClass}
              >
                <option>LT Consumer</option>
                <option>HT Consumer</option>
              </select>
            </div>

            {/* Consumer Number */}
            <div>
              <label
                htmlFor="consumerNumber"
                className="mb-2 block text-sm font-semibold text-[#2D103B]"
              >
                Consumer number (12 digits){" "}
                <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <Zap
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786A7D]"
                />

                <input
                  id="consumerNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={12}
                  value={consumerNumber}
                  onChange={(e) => {
                    setConsumerNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 12)
                    );
                    setBill(null);
                    setError("");
                  }}
                  placeholder="Enter 12-digit consumer number"
                  className={`${inputClass} pl-10`}
                  required
                />
              </div>

              <p className="mt-2 text-xs text-[#786A7D]">
                Find this number on your electricity bill.
              </p>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#61197B] px-5 py-3 font-medium text-white transition hover:bg-[#4E1263]"
              >
                <Search size={18} />
                Fetch bill
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#D8C6E4] px-5 py-3 text-[#2D103B] transition hover:bg-[#F5EDF7]"
              >
                <RotateCcw size={17} />
                Clear
              </button>
            </div>
          </form>
        </section>

        {/* Information Card */}
        <div className="space-y-5">
          <section className="rounded-3xl border border-[#D8C6E4] bg-[#FFFEF6] p-6">
            <div className="flex items-center gap-3 text-[#61197B]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E3F5]">
                <ShieldCheck size={23} />
              </div>
              <h2 className="text-lg font-bold text-[#2D103B]">
                Secure bill lookup
              </h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#5E4A67]">
              Retrieve your bill using your consumer number. Review the billing
              period, units consumed, due date, and payable amount before
              proceeding to payment.
            </p>
          </section>

          <section className="rounded-3xl border border-[#D8C6E4] bg-[#EFDFF3] p-6">
            <div className="flex items-center gap-3 text-[#61197B]">
              <CalendarDays size={21} />
              <h3 className="font-bold">Avoid late payment</h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-[#5E4A67]">
              Check your bill's due date and pay through an authorized payment
              channel to avoid applicable late fees.
            </p>
          </section>
        </div>
      </div>

      {/* Bill Details — visible after lookup */}
      {bill && (
        <section className="mt-6 rounded-3xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 shadow-sm md:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-[#6B4C7B]">Electricity bill</p>
              <h2 className="mt-2 text-2xl font-bold text-[#2D103B]">
                Bill details
              </h2>
              <p className="mt-2 text-sm text-[#786A7D]">
                Consumer: {bill.consumerNumber}
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#FFF0C2] px-4 py-2 text-sm font-semibold text-[#8A5A00]">
              {bill.status}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Consumer name", bill.consumerName],
              ["Billing period", bill.billingPeriod],
              ["Units consumed", `${bill.units} units`],
              ["Due date", bill.dueDate],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-[#E3D4E8] p-4"
              >
                <p className="text-sm text-[#786A7D]">{label}</p>
                <p className="mt-2 font-semibold text-[#2D103B]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col justify-between gap-5 rounded-2xl bg-[#F5EDF7] p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-[#6B4C7B]">Total amount due</p>

              <h3 className="mt-2 flex items-center gap-1 text-3xl font-bold text-[#61197B]">
                <IndianRupee size={26} />
                {bill.amount.toLocaleString("en-IN")}
              </h3>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#61197B] px-6 py-3 font-semibold text-white transition hover:bg-[#4E1263]"
            >
              <CreditCard size={19} />
              Proceed to payment
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#786A7D]">
            Demonstration only: displayed bill details and amount are sample
            data. No payment is processed.
          </p>
        </section>
      )}
    </div>
    </Layout>
    
  );
};

export default PayBill;
``