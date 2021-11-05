const form = document.querySelector(".form");
const normal = document.querySelector(".normal");
const silver = document.querySelector(".silver");
const gold = document.querySelector(".gold");

var database = firebase.database();

form.addEventListener("submit", (event) => {
   event.preventDefault();
   let newCourse = true;

   database.ref("student").on("value", function (data) {
      data.forEach((student) => {
         let studentInfo = student.val();

         if (studentInfo.code === form.code.value && studentInfo.course === form.course.value) {
            newCourse = false;
         }
      });
   });

   if (form.name.value != "" && form.code.value != "" && form.course.value != "" && newCourse) {
      let reference = database.ref("student").push();

      const info = {
         id: reference.key,
         name: form.name.value,
         code: form.code.value,
         course: form.course.value,
         number: 0,
      };

      reference.set(info);

      form.name.value = "";
      form.code.value = "";
      form.course.value = "";
   } else if (!newCourse) {
      alert("El estudiante ya fue registrado en este curso");
   } else {
      alert("Por favor rellena todos los datos");
   }
});

database.ref("student").on("value", function (data) {
   gold.innerHTML = "";
   normal.innerHTML = "";
   silver.innerHTML = "";

   data.forEach((student) => {
      let studentInfo = student.val();

      let card = new Card(studentInfo);


      if (studentInfo.number > 10) {
         gold.appendChild(card.render());
      } else if (studentInfo.number > 5) {
         silver.appendChild(card.render());
      } else {
         normal.appendChild(card.render());
      }
   });
});
