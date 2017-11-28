const cart = require('./cart.js');
const data = require('./data/cars.js');

describe('Cart Properties:', ()=>{
    test('Cart is []', ()=>{
        let result = cart.cart;

        expect(result.constructor).toBe(Array);
        expect(result.length).toBe(0);
    })
    test('Total is 0', ()=>{
        let result = cart.total;

        expect(result.constructor).toBe(Number);
        expect(result).toBe(0);
    })
})
describe('Cart Methods:', ()=>{
    beforeEach(()=>{
        cart.cart = [];
        cart.total = 0;
    })
    test('addTo cart test', ()=>{
        let initial = cart.cart.length;
        let car = data[0];
        
        cart.addToCart(car);
        let lengthIncreased = cart.cart.length - initial;

        expect(lengthIncreased).toBe(1);
        expect(car).toEqual(cart.cart.pop());
    })
    test('Cart increases by one when addTo is called', ()=>{
        let initial = cart.cart.length;
        let car = data[0];
        
        cart.addToCart(car);
        let result = cart.cart.length - initial;

        expect(result).toBe(1);
    })
    test('carts total price is updated when addToCart is called',()=>{
        let initialTotal = cart.total;
        let increase = data[0].price;

        cart.addToCart(data[0]);
        let currentTotal = cart.total;

        expect(initialTotal).toBeLessThan(currentTotal);
        expect(initialTotal).toBeCloseTo(currentTotal - increase);
        expect(currentTotal - initialTotal).not.toBeCloseTo(0);
    })
    test('removeFromCart length and order test', ()=>{
        cart.addToCart(data[0]);
        cart.addToCart(data[3]);
        cart.addToCart(data[2]);
        cart.addToCart(data[5]);
        cart.addToCart(data[4]);
        let initial = cart.cart.length;
        let initialCart = cart.cart;

        cart.removeFromCart(3, data[5].price);
        let current = cart.cart.length;

        expect(current).toBe(initial - 1);
        expect(cart.cart).toEqual([data[0], data[3], data[2], data[4]])
    })
    test('removeFromCart subtracts right price', ()=>{
        cart.addToCart(data[0]);
        cart.addToCart(data[3]);
        cart.addToCart(data[2]);
        cart.addToCart(data[5]);
        cart.addToCart(data[4]);
        let initial = cart.total;

        cart.removeFromCart(3, data[5].price);
        let current = cart.total;

        expect(current).toBeCloseTo(initial - data[5].price);
    })
    test('cart === [] and total === 0 on checkout', ()=>{
        cart.addToCart(data[0]);
        cart.addToCart(data[3]);
        cart.addToCart(data[2]);
        cart.addToCart(data[5]);
        cart.addToCart(data[4]);

        cart.checkout();

        expect(cart.cart.length).toBe(0);
        expect(cart.total).toBe(0);
    })
})

