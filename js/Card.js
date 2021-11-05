class Card {
   constructor(CardInfo) {
      this.CardInfo = CardInfo;
   }

   render = () => {
      let database = firebase.database();

      let CardHTML = document.createElement("div");
      CardHTML.className = "card";

      let CardCourse = document.createElement("h1");
      CardCourse.innerHTML = this.CardInfo.course;

      let CardName = document.createElement("p");
      CardName.innerHTML = this.CardInfo.name;

      let CardCode = document.createElement("p");
      CardCode.innerHTML = this.CardInfo.code;

      let CardNumber = document.createElement("p");
      CardNumber.innerHTML = this.CardInfo.number;

      let CardBtns = document.createElement("div");

      let ButtonDelete = document.createElement("button");
      ButtonDelete.className = "ButtonDelete";
      ButtonDelete.innerHTML = "Eliminar";

      ButtonDelete.addEventListener("click", () => {
         database.ref("student/" + this.CardInfo.id).remove();
      });

      let ButtonAdd = document.createElement("button");
      ButtonAdd.className = "ButtonAdd";
      ButtonAdd.innerHTML = "Aumentar";

      ButtonAdd.addEventListener("click", () => {
         database.ref("student/" + this.CardInfo.id + "/number").set((this.CardInfo.number += 1));
      });

      CardBtns.appendChild(ButtonDelete);
      CardBtns.appendChild(ButtonAdd);

      CardHTML.appendChild(CardCourse);
      CardHTML.appendChild(CardName);
      CardHTML.appendChild(CardCode);
      CardHTML.appendChild(CardNumber);
      CardHTML.appendChild(CardBtns);

      return CardHTML;
   };
}
