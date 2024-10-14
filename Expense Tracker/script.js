document.addEventListener("DOMContentLoaded", () => {
  const expanseForm = document.getElementById("expanse-form");
  const expanseNameInput = document.getElementById("expanse-name");
  const expanseAmountInput = document.getElementById("amount");
  const expanseLists = document.getElementById("expanse-lists");
  const totalCostDisplay = document.getElementById("total");
  let expanse = JSON.parse(localStorage.getItem("expanse")) || [];

  let totalCost = 0;
  if (expanse.length > 0) {
    displayExpanse();
  }
  expanseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const expanseName = expanseNameInput.value.trim();
    const amount = parseInt(expanseAmountInput.value.trim());
    if (expanseName === "" || isNaN(amount) || amount < 0) {
      alert("please Enter valid Input");
      return;
    }

    const expanseObj = {
      id: Date.now(),
      name: expanseName,
      amount: amount,
    };
    expanseNameInput.value = "";
    expanseAmountInput.value = "";
    expanse.push(expanseObj);
    saveLocalStorage();
    displayExpanse();
  });

  function displayExpanse() {
    expanseLists.innerText = "";
    expanse.forEach((expanse) => {
      const expanseDiv = document.createElement("div");
      expanseDiv.classList.add("expanse");
      totalCost += expanse.amount;
      expanseDiv.innerHTML = `<p>${expanse.name}-$${expanse.amount}</p>
                    <button id="${expanse.id}">Delete</button>`;
      expanseLists.appendChild(expanseDiv);
    });
    totalCostDisplay.innerText = `${totalCost}`;
    totalCost = 0;
  }

  expanseLists.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expanseId = parseInt(e.target.getAttribute("id"));
      expanse = expanse.filter((expanse) => expanse.id !== expanseId);
      saveLocalStorage();
      displayExpanse();
    }
  });

  function saveLocalStorage() {
    localStorage.setItem("expanse", JSON.stringify(expanse));
  }
});
