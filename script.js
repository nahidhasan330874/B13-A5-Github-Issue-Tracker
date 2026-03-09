const cardContainer = document.getElementById("card-container");
const cardLoading = document.getElementById("loading");

// Buttons
const btnAll = document.getElementById("btn1");
const btnOpen = document.getElementById("btn2");
const btnClosed = document.getElementById("btn3");

const issuesCounts = document.querySelector("span");
const openCounts = document.querySelectorAll(".flex")[0];
const closedCounts = document.querySelectorAll(".flex")[1];

let allCards = [];

// Show/Hide loading
function showLoading() {
  cardLoading.classList.remove("hidden");
}
function hideLoading() {
  cardLoading.classList.add("hidden");
}

// search
document.getElementById('btn-search').addEventListener(('click'), () =>{
     showLoading()
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue)
     
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        const allData = data.data
        // console.log(allData)
        const filterData = allData.filter((word) => 
        word.title.toLowerCase().includes(searchValue)
    );
     displayCards(filterData);
     hideLoading();
    });
})



const modalLoading = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const displayDetails = (word) => { 
  const detailsBox = document.getElementById("container");
  detailsBox.innerHTML = `  <div  class="modal-box">
            <h3 class="text-lg font-bold mb-1"> ${word.title}</h3>
            <ul class="flex gap-3 mb-5">
              <li
                class="bg-[#00A96E] text-[12px] text-white px-2 rounded-xl uppercase items-center"
              >
                 ${word.status}
              </li>
              <li class="text-[12px] text-[#64748B]"><i class="fa-solid fa-circle"></i> Opened by ${word.author}</li>
              <li class="text-[12px] text-[#64748B]"><i class="fa-solid fa-circle"></i> ${word.updatedAt}</li>
            </ul>
            <div class="flex items-center gap-4 mb-6">
              <h2
                class="flex items-center text-[12px] font-medium gap-1 text-[#EF4444] bg-[#FEECEC] px-2 rounded-xl"
              >
                <span class="w-2"><img src="./images/bug.png" alt="" /></span>
                Bug
              </h2>
              <h2
                class="flex items-center text-[12px] font-medium gap-1 text-[#D97706] bg-[#fff6d0] px-2 rounded-xl"
              >
                <span class="w-3 uppercase"
                  ><img src="./images/bug-2.png" alt=""
                /></span>
                Help wanted
              </h2>
            </div>
            <p class="text-[#64748B] text-xs mb-4 line-clamp-2">${word.description}</p>

            <div class="bg-base-200 p-4 grid grid-cols-2">
                 <div>
                    <p  class="text-[#64748B] text-xs">Assignee:</p>
                    <h2 class="font-semibold text-xs">${word.author}</h2>
                 </div>

                 <div>
                    <p  class="text-[#64748B] text-xs">Priority:</p>
                   <p class="btn btn-xs btn-error uppercase  cursor-default btn-active rounded-xl text-white text-[10px] font-medium ">${word.priority}</p>
                 </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
              </form>
            </div>
          </div> `;
  document.getElementById("modal").showModal();
};

async function loadCards() {
  showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allCards = data.data;
  displayCards(allCards);
  updateSummary(allCards);
  hideLoading();
}

function displayCards(cards) {
  cardContainer.innerHTML = "";

  cards.forEach((card) => {
    const allCard = document.createElement("div");
    const borderColor =
      card.status === "open"
        ? "border-t-4 border-[#00A96E]"
        : "border-t-4 border-[#A855F7]";
    const statusImg =
      card.status === "open"
        ? "./images/Open-Status.png"
        : "./images/Closed- Status .png";

    allCard.innerHTML = `
      <div onclick="modalLoading(${card.id})" class="bg-base-100 shadow-sm rounded-md h-full w-full object-cover ${borderColor}">
        <div class="p-4 space-y-3">
          <div class="flex justify-between items-center">
            <img src="${statusImg}" alt="" />
            <h6 class="bg-[#FEECEC] px-3 text-[12px] text-[#EF4444] font-semibold rounded-2xl uppercase">${card.priority}</h6>
          </div>
          <div class="space-y-2">
            <h2 class="font-semibold text-[14px]">${card.title}</h2>
            <p class="text-[#64748B] text-[12px] line-clamp-2">${card.description}</p>
          </div>
          <div class="flex items-center gap-4">
            <h2 class="flex items-center text-[12px] font-medium gap-1 text-[#EF4444] bg-[#FEECEC] px-2 rounded-xl">
              <span class="w-2"><img src="./images/bug.png" alt=""></span> Bug
            </h2>
            <h2 class="flex items-center text-[12px] font-medium gap-1 text-[#D97706] bg-[#fff6d0] px-2 rounded-xl">
              <span class="w-3 uppercase"><img src="./images/bug-2.png" alt=""></span> Help wanted
            </h2>
          </div>
        </div>
        <hr class="border-gray-300">
        <div class="p-4">
          <p class="text-gray-400 text-[12px]">john_doe</p>
          <p class="text-gray-400 text-[12px]">2024-01-15T10:30:00Z</p>
        </div>
      </div>
    `;
    cardContainer.append(allCard);
  });
}

function updateSummary(cards) {
  const openCount = cards.filter((card) => card.status === "Open").length;
  const closedCount = cards.filter((card) => card.status === "Closed").length;
  issuesCounts.textContent = cards.length;
  openCounts
    .querySelector(".openBtns")
    ?.nextSibling?.replaceWith(`Open (${openCount})`);
  closedCounts
    .querySelector(".colseBtns")
    ?.nextSibling?.replaceWith(`Closed (${closedCount})`);
}

btnAll.addEventListener("click", () => {
  displayCards(allCards);
  updateSummary(allCards);
  setActiveBtn(btnAll);
});

btnOpen.addEventListener("click", () => {
  const filtered = allCards.filter((open) => open.status === "Open");
  displayCards(filtered);
  updateSummary(filtered);
  setActiveBtn(btnOpen);
});

btnClosed.addEventListener("click", () => {
  const filtered = allCards.filter((close) => close.status === "Closed");
  displayCards(filtered);
  updateSummary(filtered);
  setActiveBtn(btnClosed);
});

function setActiveBtn(activeBtn) {
  [btnAll, btnOpen, btnClosed].forEach((btn) =>
    btn.classList.remove("btn-primary"),
  );
  activeBtn.classList.add("btn-primary");
  if (activeBtn !== btnAll) {
    activeBtn.classList.add("btn");
  }
}

btnOpen.addEventListener("click", async () => {
  showLoading();
  const filtered = allCards.filter((click) => click.status === "open");
  await new Promise((res) => setTimeout(res, 300));
  displayCards(filtered);
  updateSummary(filtered);
  hideLoading();
  setActiveBtn(btnOpen);
});
btnClosed.addEventListener("click", async () => {
  showLoading();

  const filtered = allCards.filter((click) => click.status === "closed");
  await new Promise((res) => setTimeout(res, 300));

  displayCards(filtered);
  updateSummary(filtered);
  hideLoading();
  setActiveBtn(btnClosed);
});

loadCards();

