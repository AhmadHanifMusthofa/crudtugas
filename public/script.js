// Ganti sesuai IP/DNS backend EC2 atau ALB
const API_BASE = "http://<BACKEND_PUBLIC_IP>:3000";

const userForm = document.getElementById("userForm");
const userIdInput = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const userTableBody = document.querySelector("#userTable tbody");

async function loadUsers() {
  try {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error("Gagal ambil data user");
    const users = await res.json();
    userTableBody.innerHTML = "";
    users.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.age}</td>
        <td>
          <button onclick="editUser(${u.id}, '${u.name}', '${u.email}', ${u.age})">Edit</button>
          <button onclick="deleteUser(${u.id})">Hapus</button>
        </td>
      `;
      userTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert("Gagal load data user");
  }
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = userIdInput.value;
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value,
  };
  let url = `${API_BASE}/users`,
    method = "POST";
  if (id) {
    url = `${API_BASE}/users/${id}`;
    method = "PUT";
  }

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      resetForm();
      loadUsers();
    } else {
      alert("Error simpan user");
    }
  } catch (err) {
    console.error(err);
    alert("Gagal simpan user");
  }
});

function editUser(id, name, email, age) {
  userIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
  ageInput.value = age;
  submitBtn.textContent = "Update User";
  cancelBtn.style.display = "inline";
}

async function deleteUser(id) {
  if (confirm("Yakin hapus user ini?")) {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
      if (res.ok) loadUsers();
      else alert("Gagal hapus user");
    } catch (err) {
      console.error(err);
      alert("Error koneksi ke server");
    }
  }
}

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
  userIdInput.value = "";
  nameInput.value = "";
  emailInput.value = "";
  ageInput.value = "";
  submitBtn.textContent = "Tambah User";
  cancelBtn.style.display = "none";
}

loadUsers();
