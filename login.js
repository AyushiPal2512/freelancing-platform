document.getElementById("loginBtn").addEventListener("click", async () => {
  let email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("error");

  errorBox.textContent = "";
  errorBox.className = "message";

  if (!email || !password) {
    errorBox.textContent = "Please enter email and password!";
    errorBox.className = "error";
    return;
  }

  email = email.toLowerCase();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);

    // Redirect based on role
    if (data.user.role === "admin") window.location.href = "admin.html";
    else if (data.user.role === "freelancer") window.location.href = "freelancer.html";
    else window.location.href = "dashboard.html";

  } catch (err) {
    errorBox.textContent = err.message;
    errorBox.className = "error";
    console.error("Login error:", err);
  }
});

