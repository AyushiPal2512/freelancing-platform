document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const msg = document.getElementById("message");

  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    msg.textContent = "";
    msg.className = "message";

    if (!name || !email || !password || !role) {
      msg.textContent = "Please fill all fields!";
      msg.className = "error";
      return;
    }

    email = email.toLowerCase();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      msg.className = "success";
      msg.textContent = "✅ Signup successful! Redirecting to login...";
      setTimeout(() => window.location.href = "login.html", 1500);

    } catch (err) {
      msg.className = "error";
      msg.textContent = err.message;
      console.error("Signup error:", err);
    }
  });
});
