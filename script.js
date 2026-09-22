    let tasks = [
      { text: "Mengerjakan praktikum pemweb", completed: false },
      { text: "Mengerjakan praktikum ethack", completed: false },
      { text: "Mengerjakan praktikum jarkom", completed: true }
    ];

    // Filter yang lagi aktif
    let currentFilter = "semua";


    const inputTugas = document.getElementById("input-tugas");
    const tombolTambah = document.getElementById("tombol-tambah");
    const daftarTugas = document.getElementById("daftar-tugas");
    const tombolFilter = document.querySelectorAll(".tombol-filter");


    // nyimpen data tasks ke Local Storage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    // ngambil data tasks dari Local Storage
    function loadTasks() {
      const data = localStorage.getItem("tasks");

      if (data) {
        tasks = JSON.parse(data);
      }
    }

    //render task
    function renderTasks() {
      daftarTugas.innerHTML = "";

      let filteredTasks = tasks;

      if (currentFilter === "aktif") {
        filteredTasks = tasks.filter((task) => !task.completed);
      }

      if (currentFilter === "selesai") {
        filteredTasks = tasks.filter((task) => task.completed);
      }

      filteredTasks.forEach((task) => {

        const li = document.createElement("li");

        li.className =
          "kotak-tugas" + (task.completed ? " selesai" : "");


        const span = document.createElement("span");

        span.className = "teks-tugas";
        span.textContent = task.text;

        //completed
        span.addEventListener("click", () => {

          task.completed = !task.completed;

          // Simpan perubahan status ke Local Storage
          saveTasks();

          renderTasks();
        });

        //delete
        const tombolHapus = document.createElement("button");

        tombolHapus.type = "button";
        tombolHapus.className = "tombol-hapus";
        tombolHapus.textContent = "Hapus";


        tombolHapus.addEventListener("click", () => {

          // Cari index asli task
          const index = tasks.indexOf(task);

          if (index !== -1) {
            tasks.splice(index, 1);
          }

          // Simpan perubahan ke Local Storage
          saveTasks();

          renderTasks();
        });


        li.appendChild(span);
        li.appendChild(tombolHapus);

        daftarTugas.appendChild(li);
      });
    }


    function tambahTugas() {

      const teks = inputTugas.value.trim();


      // Jangan tambahkan task jika input kosong
      if (teks === "") {
        return;
      }


      tasks.push({
        text: teks,
        completed: false
      });


      inputTugas.value = "";


      // Simpan task baru ke Local Storage
      saveTasks();

      renderTasks();
    }


    // Klik tombol Tambah
    tombolTambah.addEventListener("click", tambahTugas);


    // Tekan Enter untuk menambah task
    inputTugas.addEventListener("keydown", (e) => {

      if (e.key === "Enter") {
        tambahTugas();
      }

    });


    //filtering
    tombolFilter.forEach((tombol) => {

      tombol.addEventListener("click", () => {

        // Ambil filter dari atribut data-filter
        currentFilter = tombol.dataset.filter;


        // Hapus status aktif dari semua tombol
        tombolFilter.forEach((btn) => {
          btn.classList.remove("aktif");
        });


        // Berikan status aktif ke tombol yang diklik
        tombol.classList.add("aktif");


        // Render ulang sesuai filter
        renderTasks();

      });

    });


    loadTasks(); //load data

    renderTasks();