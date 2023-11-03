import React, { useState, useEffect } from "react";
import "./Main.css";
import frame from "../../assets/Frame.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoCheck } from "react-icons/go";

const Main = () => {
  const [selectedOption1, setSelectedOption1] = useState("FY 2023-24");
  const [selectedOption2, setSelectedOption2] = useState("Australia");

  const [salePrice, setSalePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption1(event.target.value);
    setSelectedOption2(event.target.value);
  };
  const [selectedIncome, setSelectedIncome] = useState("$0-$18,200");
  const [taxValue, setTaxValue] = useState(0);

  const handleIncomeChange = (event) => {
    const selectedIncome = event.target.value;
    setSelectedIncome(selectedIncome);
    setTaxValue(taxrate[selectedIncome]);
  };

  const [investmentType, setInvestmentType] = useState("Long Term");

  const taxrate = {
    "$0-$18,200": "0%",
    "$18,201 - $45,000": "Nil + 19% of excess over $18,200",
    "$45,001 - $120,000": "$5,092 + 32.5% of excess over $45,000",
    "$120,001 - $180,000": "$29,467 + 37% of excess over $120,000",
    "$180,001+": "$51,667 + 45% of excess over $180,000",
  };
  const [discountGain, setDiscountGain] = useState(0);

  const calculateCapitalGains = salePrice - purchasePrice - expenses;
  const handleInvestmentTypeChange = (type) => {
    setInvestmentType(type);
  };

  useEffect(() => {
    if (investmentType === "Long Term" && calculateCapitalGains > 0) {
      setDiscountGain(calculateCapitalGains * 0.5);
    } else {
      setDiscountGain(0);
    }
  }, [investmentType, calculateCapitalGains]);

  const [nextCapitalGain, setNextCapitalGain] = useState(0);

  const extractPercentages = (taxRates) => {
    const percentages = {};

    for (const key in taxRates) {
      const value = taxRates[key];
      const matches = value.match(/\d+\.\d+/);

      if (matches) {
        percentages[key] = matches[0];
      }
    }

    return percentages;
  };
  const percentageValues = extractPercentages(taxrate);

  useEffect(() => {
    if (taxValue !== 0 && calculateCapitalGains > 0) {
      const percentage = percentageValues[selectedIncome] / 100;

      if (investmentType === "Long Term") {
        setNextCapitalGain(discountGain * percentage);
      } else {
        setNextCapitalGain(calculateCapitalGains * percentage);
      }
    } else {
      setNextCapitalGain(0);
    }
  }, [
    investmentType,
    calculateCapitalGains,
    selectedIncome,
    taxValue,
    discountGain,
    percentageValues,
  ]);

  return (
    <div className="mainbody">
      <div className="main">
        <div className="tax_calculator">
          <h1>Free Crypto Tax Calculator Australia</h1>
          <div className="dropdown">
            <div className="finance_dropdown">
              <div className="heading">Financial Year</div>
              <select value={selectedOption1} onChange={handleOptionChange}>
                <option value="FY 2023-24"> FY 2023-24</option>
              </select>
            </div>
            <div className="country_dropdown">
              <div className="heading">Country</div>
              <select value={selectedOption2} onChange={handleOptionChange}>
                <option value="Australia"> Australia</option>
              </select>
            </div>
          </div>
          <div className="borderline"></div>
          <div className="allselections">
            <div className="firstinputs">
              <div className="selection">
                <div className="heading">Enter Purchase price of Crypto</div>
                <div>
                  {/* <BsCurrencyDollar className="dollarsign"/> */}
                  <input
                    className="selectioninput"
                    type="text"
                    value={`$${purchasePrice}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith("$")) {
                        setPurchasePrice(value.slice(1));
                      } else {
                        setPurchasePrice(value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="selection">
                <div className="heading">Enter Sale Price of Crypto</div>
                <div>
                  <input
                    className="selectioninput"
                    type="text"
                    value={`$${salePrice}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith("$")) {
                        setSalePrice(value.slice(1));
                      } else {
                        setSalePrice(value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="firstinputs">
              <div className="selection">
                <div className="heading">Enter Your Expenses</div>
                <div>
                  <input
                    className="selectioninput"
                    type="text"
                    value={`$${expenses}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith("$")) {
                        setExpenses(value.slice(1));
                      } else {
                        setExpenses(value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="selection">
                <div className="heading">Investment Type</div>
                <div className="shortlongbtn">
                  <div className="btntime">
                    <button
                      className={`btn ${
                        investmentType === "Short Term" ? "btnselected" : ""
                      }`}
                      onClick={() => handleInvestmentTypeChange("Short Term")}
                    >
                      Short Term{" "}
                      {investmentType === "Short Term" && <GoCheck />}
                    </button>
                    <div className="time_period"> &lt; 12 Months </div>
                  </div>
                  <div className="btntime">
                    <button
                      className={`btn ${
                        investmentType === "Long Term" ? "btnselected" : ""
                      }`}
                      onClick={() => handleInvestmentTypeChange("Long Term")}
                    >
                      Long Term {investmentType === "Long Term" && <GoCheck />}
                    </button>
                    <div className="time_period"> &gt; 12 Months </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="firstinputs">
                <div>
                  <div className="heading">Select Your Annual Income</div>
                  <div>
                    <select
                      value={selectedIncome}
                      onChange={handleIncomeChange}
                      className="taxrate"
                    >
                      {Object.keys(taxrate).map((incomeRange) => (
                        <option
                          key={incomeRange}
                          value={incomeRange}
                          className="incomeoptions"
                        >
                          {incomeRange}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="taxrateheading">
                  <div className="heading">Tax Rate</div>
                  <div className="taxvalue">
                    {taxValue && <p> {taxValue}</p>}
                  </div>
                </div>
              </div>
            </div>
            {investmentType === "Long Term" && (
              <div className="firstinputs">
                <div className="selection">
                  <div className="heading">Capitals gains amount</div>
                  <input
                    className="selectioninput"
                    type="text"
                    
                    value={`$${calculateCapitalGains}`}
                    
                    readOnly
                  />
                </div>
                <div className="selection">
                  <div className="heading">Discount for long term gains</div>
                  <input
                    className="selectioninput"
                    type="text"
                    value={`$${discountGain}`}
                    readOnly
                  />
                </div>
              </div>
            )}

            <div className="firstinputs">
              <div className="nettaxdiv">
                <div className="netcapital">
                  <div>Net Capital gains tax amount</div>
                  <div className="gainprice">
                    $
                    {investmentType === "Long Term"
                      ? discountGain
                      : calculateCapitalGains}
                  </div>
                </div>
                <div className="totaltax">
                  <div>Net Capital gains tax amount</div>
                  <div className="taxpay">${nextCapitalGain}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="koinxdetails">
        <div className="headline">Get Started with KoinX for FREE</div>
        <div className="tagline">
          With our range of features that you can equip for free, KoinX allows
          you to be more educated and aware of your tax reports.
        </div>
        <div className="imagediv">
          <img src={frame} alt="/" className="koinxdetailsimg" />
        </div>
        <div className="koinxbtndiv">
          <button className="koinxbtn">
            Get Started for FREE{" "}
            <div>
              <FaArrowRightLong />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
