// Các thuật toán tính thuế (Strategies)
const vatStrategy = (price) => price * 0.10; // VAT 10%
const luxuryStrategy = (price) => price * 0.30; // Thuế xa xỉ 30%
const noTaxStrategy = (price) => 0; // Không tính thuế

// Đối tượng sử dụng
class Product {
    constructor(name, basePrice, taxStrategy) {
        this.name = name;
        this.basePrice = basePrice;
        this.taxStrategy = taxStrategy;
    }

    setTaxStrategy(newStrategy) {
        this.taxStrategy = newStrategy;
    }

    getFinalPrice() {
        const tax = this.taxStrategy(this.basePrice);
        return this.basePrice + tax;
    }
}

// --- Chạy thử nghiệm ---
const laptop = new Product("Laptop Dell", 1000, vatStrategy);
const diamondRing = new Product("Nhẫn Kim Cương", 5000, luxuryStrategy);

console.log(`${laptop.name} (có VAT): $${laptop.getFinalPrice()}`);
console.log(`${diamondRing.name} (Thuế xa xỉ): $${diamondRing.getFinalPrice()}`);

// Thay đổi loại thuế lúc runtime một cách linh hoạt
diamondRing.setTaxStrategy(vatStrategy);
console.log(`\n${diamondRing.name} (Đổi sang áp dụng VAT): $${diamondRing.getFinalPrice()}`);