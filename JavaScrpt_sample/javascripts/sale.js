// Obtener elementos del DOM para el producto y la cantidad
const productElement = document.getElementById("product");
const numberElement = document.getElementById("number");

// Inicializar un array vacío para almacenar las compras
let purchases = [];


// Función para obtener el producto por su ID
function getProductById(productId) {
    return products.find(product => product.id === productId);
}

// Función para añadir una compra
function addPurchase(product, number) {
    purchases.push({
        nombre: product.nombre,
        precio: product.precio,
        number: number
    });
    window.alert(`Nombre: ${product.nombre}. \nPrecio: ${product.precio} yenes. \nCantidad: ${number} unidades.`);
}

// Función para validar la cantidad
function validateNumber(number) {
    return !isNaN(number) && number > 0;
}

// Función principal para añadir un producto a las compras
function add() {
    const productId = parseInt(productElement.value);
    const number = parseInt(numberElement.value);

    if (!validateNumber(number)) {
        window.alert("Seleccione una cantidad válida antes de continuar, Por favor.");
        return;
    }

    const product = getProductById(productId);

    if (product) {
        addPurchase(product, number);
    } else {
        window.alert("Producto no hallado.");
    }
}

// Función para calcular el total de las compras
function calc() {
    let sum = 0;
    let postage = '';

    purchases.forEach(purchase => {
        const subtotal = purchase.precio * purchase.number;
        sum += subtotal;
        postage += `${purchase.nombre} \n ${purchase.number} unidades: ${subtotal} yenes.\n`;
    });

    const shippingCost = calcPostageFromPurchase(sum);
    const total = sum + shippingCost;

    window.alert(`${postage}\nSubtotal: ${sum} yenes. \nLa tarifa del envío es: ${shippingCost} yenes. \nTotal a pagar: ${total} yenes.`);

    resetPurchases();
}

// Función para calcular los gastos de envío basados en el subtotal
function calcPostageFromPurchase(subtotal) {
    if (subtotal <= 3000) {
        return 500;
    } else if (subtotal < 1000) {
        return 500;
    } else {
        return 250;
    }
}

// Función para reiniciar las compras y los valores de los elementos del formulario
function resetPurchases() {
    purchases = [];
    productElement.value = "";
    numberElement.value = "";
}

// Lista de productos disponibles con sus respectivos precios y nombres
const products = [
    {id: 1, nombre: "Mezcla original 200g", precio: 500},

    {id: 2, nombre: "Mezcla original 500g", precio: 900},

    {id: 3, nombre: "Mezcla especial 200g", precio: 700},

    {id: 4, nombre: "Mezcla especial 500g",precio: 1200},
];
