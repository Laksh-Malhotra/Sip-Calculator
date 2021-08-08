// Generals
const investment = document.getElementById("investments");
const year = document.getElementById("year");
const rate = document.getElementById("rate");
const aValue = document.querySelector(".a_value");
const rValue = document.querySelector(".r_value");
const fValue = document.querySelector(".f_value");
const chartContainer = document.querySelector(".chart-container");
const btnSip = document.getElementById("Sip");
const btnLumpsum = document.getElementById("Lumpsum");
const ctx = document.getElementById("myChart").getContext("2d");
let amount;
let years;
let interestRate;

// To perform SIP and LUMPSUM calculation
const calculate = function (e) {
  e.preventDefault();

  aValue.textContent = "";
  rValue.textContent = "";
  fValue.textContent = "";

  amount = +investment.value;
  years = +year.value;
  interestRate = +rate.value;

  investment.value = "";
  year.value = "";
  rate.value = "";

  if (
    isNaN(amount) ||
    isNaN(years) ||
    isNaN(interestRate) ||
    amount === 0 ||
    years === 0 ||
    interestRate === 0
  )
    return alert("All fields are required and should be a number!!!");

  if (btnSip.checked) {
    const futureValue = Math.round(
      (amount *
        (1 + interestRate / 12 / 100) *
        (Math.pow(1 + interestRate / 12 / 100, years * 12) - 1)) /
        (interestRate / 12 / 100)
    );
    const investedAmount = amount * years * 12;
    const returns = futureValue - investedAmount;
    aValue.textContent = `₹ ${investedAmount.toLocaleString("en-IN")}`;
    rValue.textContent = `₹ ${returns.toLocaleString("en-IN")}`;
    fValue.textContent = `₹ ${futureValue.toLocaleString("en-IN")}`;
    chartContainer.style.display = "block";
    renderChart(investedAmount, returns);
  } else if (btnLumpsum.checked) {
    const futureValue = Math.round(
      Math.pow(1 + interestRate / 100, years) * amount
    );
    const investedAmount = amount;
    const returns = futureValue - amount;
    aValue.textContent = `₹ ${investedAmount.toLocaleString("en-IN")}`;
    rValue.textContent = `₹ ${returns.toLocaleString("en-IN")}`;
    fValue.textContent = `₹ ${futureValue.toLocaleString("en-IN")}`;
    chartContainer.style.display = "block";
    renderChart(investedAmount, returns);
  }
};

// To render chart
const renderChart = function (investedAmount, returns) {
  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested Amount", "Est. Returns"],
      datasets: [
        {
          backgroundColor: ["#ffa200", "#03497f"],
          data: [investedAmount, returns],
        },
      ],
    },
  });
};

// Event Handler
document.customForm.addEventListener("submit", calculate);
