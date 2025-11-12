// Dummy freelancer data (replace with API call later)
const freelancers = [
  {
    name: "John Doe",
    role: "Full Stack Developer",
    img: "https://via.placeholder.com/300x200",
  },
  {
    name: "Sarah Lee",
    role: "UI/UX Designer",
    img: "https://via.placeholder.com/300x200",
  },
  {
    name: "Michael Smith",
    role: "Digital Marketer",
    img: "https://via.placeholder.com/300x200",
  },
  {
    name: "Emily Johnson",
    role: "Content Writer",
    img: "https://via.placeholder.com/300x200",
  },
  {
    name: "David Brown",
    role: "App Developer",
    img: "https://via.placeholder.com/300x200",
  }
];

// Render freelancer cards
function renderFreelancers(data) {
  const container = document.getElementById("freelancerList");
  container.innerHTML = "";

  data.forEach(f => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card shadow hover-card">
        <img src="${f.img}" class="card-img-top" alt="${f.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${f.name}</h5>
          <p class="card-text">${f.role}</p>
          <button class="btn btn-outline-primary hireBtn">Hire Me</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach modal + hover on each Hire button
  document.querySelectorAll(".hireBtn").forEach(btn => {
    btn.style.transition = "all 0.3s ease";

    btn.addEventListener("mouseover", () => {
      btn.style.backgroundColor = "#0d6efd";
      btn.style.color = "white";
      btn.style.transform = "scale(1.1)";
    });

    btn.addEventListener("mouseout", () => {
      btn.style.backgroundColor = "transparent";
      btn.style.color = "#0d6efd";
      btn.style.transform = "scale(1)";
    });

    btn.addEventListener("click", () => {
      const hireModal = new bootstrap.Modal(document.getElementById("hireModal"));
      hireModal.show();
    });
  });
}

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("getStartedBtn");
  const featuresSection = document.getElementById("featuresSection");

  if (getStartedBtn && featuresSection) {
    getStartedBtn.addEventListener("click", () => {
      // Unhide features section
      featuresSection.classList.remove("d-none");

      // Smooth scroll to it
      featuresSection.scrollIntoView({ behavior: "smooth" });

      // Simulate fetch delay before showing freelancers
      setTimeout(() => {
        renderFreelancers(freelancers);
      }, 500);
    });
  }

  // Redirect to login when modal button clicked
  const redirectLoginBtn = document.getElementById("redirectLogin");
  if (redirectLoginBtn) {
    redirectLoginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
