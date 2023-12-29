// Мережа фастфудів пропонує кілька видів гамбургерів:

// маленький (50 тугриків, 20 калорій);
// великий (100 тугриків, 40 калорій).
// Гамбургер може бути з одним із декількох видів начинок:

// сиром (+ 10 тугриків, + 20 калорій);
// салатом (+ 20 тугриків, + 5 калорій);
// картоплею (+ 15 тугриків, + 10 калорій).
// Можна додати добавки:

// посипати приправою (+15 тугриків, 0 калорій) - полити майонезом (+ 20 тугриків, +5 калорій).
// Напишіть програму, яка розраховує вартість та калорійність гамбургера. Використовуйте ООП підхід.

// (підказка: потрібен клас Гамбургер, константи, методи для вибору опцій та розрахунку потрібних величин)

// Приклад роботи коду:

// // маленький гамбургер з начинкою з сиру
// var hamburger = new Hamburger(Hamburger .SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// // добавка з майонезу
// hamburger.addTopping(Hamburger.TOPPING_MAYO);

// // запитаємо скільки там калорій
// console.log(“Calories: “ + hamburger.calculate ());

// // скільки коштує
// console.log("Price: “ + hamburger.calculatePrice());

// // я тут передумав і вирішив додати ще приправу
// hamburger.addTopping(Hamburger .TOPPING_SAUCE);

// // А скільки тепер коштує?
// console.log("Price with sauce: “ + hamburger.calculatePrice());

const SIZE_SMALL = {
    name: 'SMALL',
    price: 50,
    calories: 20
}

const SIZE_BIG = {
    name: 'BIG',
    price: 100,
    calories: 40
}

const STUFFING_CHEESE = {
    name: 'CHEESE',
    price: 10,
    calories: 20
}

const STUFFING_SALAD = {
    name: 'SALAD',
    price: 20,
    calories: 5
}

const STUFFING_POTATO = {
    name: 'POTATO',
    price: 15,
    calories: 10
}

const TOPPING_SPICE = {
    name: 'SPICE',
    price: 15,
    calories: 0
}

const TOPPING_MAYO = {
    name: 'MAYO',
    price: 20,
    calories: 5
}

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = []
    }

    static displayMenu() {
        const menuDiv = document.getElementById('menu');
        menuDiv.innerHTML = '<h2>Menu</h2>';

        function createMenuItem(item) {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = `${item.name} - $${item.price} - ${item.calories} calories`;
            menuDiv.appendChild(menuItem);
        }
        createMenuItem(SIZE_SMALL);
        createMenuItem(SIZE_BIG);
        createMenuItem(STUFFING_CHEESE);
        createMenuItem(STUFFING_SALAD);
        createMenuItem(STUFFING_POTATO);
        createMenuItem(TOPPING_SPICE);
        createMenuItem(TOPPING_MAYO);
    }

    static addTopping(hamburger, topping) {
        hamburger.toppings.push(topping);
    }

    static calculatePrice(hamburger) {
        return hamburger.size.price + hamburger.stuffing.price +
            hamburger.toppings.reduce((acc, topping) => acc + topping.price, 0);
    }

   static calculateCalories(hamburger) {
        return hamburger.size.calories + hamburger.stuffing.calories +
            hamburger.toppings.reduce((acc, topping) => acc + topping.calories, 0);
    }

    static orderHamburger() {
        const sizeOptions = [SIZE_SMALL, SIZE_BIG];
        const stuffingOptions = [STUFFING_CHEESE, STUFFING_SALAD, STUFFING_POTATO];
        const toppingOptions = [TOPPING_SPICE, TOPPING_MAYO];

        let selectedSize;
        while (true) {
            selectedSize = prompt('Select the size of the hamburger (1, 2..):\n1. SMALL\n2. BIG');
            if (selectedSize === null) {
                alert('Order canceled')
                return;
            } else if (selectedSize === '1' || selectedSize === '2') {
                break;
            } else {
                alert('Invalid selection. Please try again.');
            }
        }

        const size = selectedSize === '1' ? SIZE_SMALL : SIZE_BIG;

        let selectedStuffing;
        while (true) {
            selectedStuffing = prompt(`Select the stuffing for the hamburger (1, 2..):\n1. CHEESE\n2. SALAD\n3. POTATO`);
            if (selectedStuffing === null) {
                alert('Order canceled')
                return;
            }
            else if (selectedStuffing === '1' || selectedStuffing === '2' || selectedStuffing === '3') {
                break;
            } else {
                alert('Invalid selection. Please try again.');
            }
        }

        let stuffing;
        switch (selectedStuffing) {
            case '1':
                stuffing = STUFFING_CHEESE;
                break;
            case '2':
                stuffing = STUFFING_SALAD;
                break;
            case '3':
                stuffing = STUFFING_POTATO;
                break;
        }

        const hamburger = new Hamburger(size, stuffing);
        document.write(`You ordered a ${hamburger.size.name} hamburger with ${hamburger.stuffing.name}.<br>`);
        document.write(`Calories: ${Hamburger.calculateCalories(hamburger)}, Price: ${Hamburger.calculatePrice(hamburger)}<br>`);

        while (true) {
            const selectedToppings = prompt(`Select toppings for the hamburger (1, 2..):\n1. SPICE\n2. MAYO (separate multiple choices with commas)`);

            const toppings = [];
            for (const topping of selectedToppings.split(',')) {
                switch (topping.trim()) {
                    case '1':
                        toppings.push(TOPPING_SPICE);
                        break;
                    case '2':
                        toppings.push(TOPPING_MAYO);
                        break;
                }
            }

            if (toppings.length > 0) {
                for (const topping of toppings) {
                    Hamburger.addTopping(hamburger, topping);
                }

                document.write(`Added toppings: ${toppings.map(t => t.name).join(', ')}.<br>`);
                document.write(`Calories: ${Hamburger.calculateCalories(hamburger)}, Price: ${Hamburger.calculatePrice(hamburger)}<br>`);
                break;
            } else if (confirm('Do you want to add toppings?')) {
                alert('Invalid topping selection. Please try again.');
            } else {
                break;
            }
        }

        document.write('Thank you for your order!');
    }
}

Hamburger.displayMenu();
Hamburger.orderHamburger();

