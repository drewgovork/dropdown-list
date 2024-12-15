class CustomSelect {
  #options;
  #currentSelectedOption = null;

  constructor(id, options) {
    this.id = id;
    this.#options = options;
  }
  get selectedValue() {
    return this.#currentSelectedOption;
  }

  render(container) {
    const dropdown = document.createElement("div");
    dropdown.className = `select-dropdown select-dropdown--${this.id}`;

    const button = document.createElement("button");
    button.className = `select-dropdown__button select-dropdown__button--${this.id}`;
    button.textContent = "Выберите элемент";

    const list = document.createElement("ul");
    list.className = `select-dropdown__list select-dropdown__list--${this.id}`;

    this.#options.forEach((option) => {
      const listItem = document.createElement("li");
      listItem.className = "select-dropdown__list-item";
      listItem.textContent = option.text;
      listItem.dataset.value = option.value; // Сохраняем значение
      list.append(listItem);
    });

    dropdown.append(button);
    dropdown.append(list);

    container.append(dropdown);

    //обработчики событий

    button.addEventListener("click", () => {
      list.classList.toggle("active");
    });

    list.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const value = event.target.dataset.value;
        this.#currentSelectedOption = this.#options.find(
          (option) => option.value == value
        );

        button.textContent = this.#currentSelectedOption.text;

        list.querySelectorAll(".select-dropdown__list-item").forEach((item) => {
          item.classList.remove("selected");
        });
        event.target.classList.add("selected");

        list.classList.remove("active");
      }
    });
  }
}

const options = [
  { value: 1, text: "JavaScript" },
  { value: 2, text: "NodeJS" },
  { value: 3, text: "ReactJS" },
  { value: 4, text: "HTML" },
  { value: 5, text: "CSS" },
];

const customSelect = new CustomSelect("123", options);
const mainContainer = document.querySelector("#container");
customSelect.render(mainContainer);
