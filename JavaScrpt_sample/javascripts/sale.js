// Lista de productos disponibles
const products = [
    {id: 1, nombre: "Mezcla original 200g", precio: 500},

    { id: 2, nombre: "Mezcla original 500g", precio: 900 },

    { id: 3, nombre: "Mezcla especial 200g", precio: 700 },

    { id: 4, nombre: "Mezcla especial 500g", precio: 1200 },
];

// Elementos del DOM para seleccionar producto y cantidad
const productElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = []; // Lista de compras

// Función para mostrar el carrito de compras
function display() {
    return purchases.map((purchase) => {
        return `${purchase.product.nombre}, ${purchase.product.precio} yenes. ${purchase.number} productos.\n`;
    }).join("");
}

// Función para calcular el subtotal de las compras
function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.product.precio * purchase.number;
    }, 0);
}

// Función para calcular los gastos de envío según el subtotal
function calcPostageFromPurchase(sum) {
    if (sum === 0 || sum >= 3000) {
        return 0;
    } else if (sum < 1000) {
        return 500;
    } else {
        return 250;
    }
}

// Función para añadir un producto al carrito de compras
function add() {
    const productId = parseInt(productElement.value);
    const number = parseInt(numberElement.value);

    if (isNaN(number) || number <= 0) {
        window.alert("Por favor, seleccione una cantidad válida.");
        return;
    }

    const product = products.find(prod => prod.id === productId);

    if (product) {
        let purchase = {
            product: product,
            number: number
        };

        const existingPurchaseIndex = purchases.findIndex(prod => prod.product.id === purchase.product.id);
        if (purchases.length < 1 || existingPurchaseIndex === -1) {
            purchases.push(purchase);
        } else {
            purchases[existingPurchaseIndex].number += purchase.number;
        }

        window.alert(`\nNombre: ${purchase.product.nombre}.\nPrecio: ${purchase.product.precio} yenes. \nCantidad: ${purchase.number} unidades.`);
        productElement.value = "";
        numberElement.value = "";
    }
}

// Función para calcular el total incluyendo el envío y mostrar el resumen
function calc() {
    let sum = subtotal();
    let shippingCost = calcPostageFromPurchase(sum);
    let total = sum + shippingCost;

    window.alert(`${display()}\nSubtotal: ${sum} yenes. \n La tarifa de envío: ${shippingCost} yenes. \nTotal: ${total} yenes`);

    purchases = [];
    resetInputs();
}

// Función para reiniciar los campos de entrada
function resetInputs() {
    productElement.value = "";
    numberElement.value = "";
}
