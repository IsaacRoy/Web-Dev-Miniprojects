// Base URL for the API
const url = "http://universities.hipolabs.com/search?country=India";

// Add event listener to the button
const btn = document.querySelector("button");
btn.addEventListener("click", async () => {
    const state = document.querySelector("input").value;
    console.log(state);
    
    const colArr = await getColleges();
    const filteredColleges = filterCollegesByState(colArr, state);
    
    console.log(filteredColleges);
    show(filteredColleges);
});

// Function to filter colleges by state
function filterCollegesByState(colleges, state) {
    return colleges.filter(col => 
        col.name.toLowerCase().includes(state.toLowerCase())
    );
}

// Function to display colleges
function show(colArr) {
    const list = document.querySelector("#list");
    list.innerHTML = ""; // Clear the list before appending new items
    
    colArr.forEach(col => {
        const li = document.createElement("li");
        li.textContent = col.name;
        list.appendChild(li);
    });
}

// Async function to fetch colleges
async function getColleges() {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.error("ERROR: ", e);
        return []; // Return an empty array on error
    }
}