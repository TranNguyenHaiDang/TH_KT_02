// --- 1. DECORATOR PATTERN (Xử lý số tiền) ---
class BasePayment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}

// Decorator cơ sở
class PaymentDecorator {
    constructor(paymentProcess) {
        this.paymentProcess = paymentProcess; // Gói đối tượng bên trong
    }
    getAmount() {
        return this.paymentProcess.getAmount();
    }
}

// Thêm Phí xử lý cố định
class ProcessingFeeDecorator extends PaymentDecorator {
    getAmount() {
        return super.getAmount() + 5.0; // Thêm 5$ phí
    }
}

// Thêm Mã giảm giá theo phần trăm
class DiscountDecorator extends PaymentDecorator {
    constructor(paymentProcess, discountPercent) {
        super(paymentProcess);
        this.discountPercent = discountPercent;
    }
    getAmount() {
        const currentAmount = super.getAmount();
        return currentAmount - (currentAmount * this.discountPercent / 100);
    }
}

// --- 2. STRATEGY PATTERN (Thực thi thanh toán) ---
class CreditCardStrategy {
    pay(amount) {
        console.log(`Đang xử lý giao dịch $${amount.toFixed(2)} qua [Thẻ Tín Dụng].`);
    }
}

class PayPalStrategy {
    pay(amount) {
        console.log(`Đang xử lý giao dịch $${amount.toFixed(2)} qua [PayPal].`);
    }
}

// --- Chạy thử nghiệm ---

// Tạo đơn hàng gốc 100$
let myPayment = new BasePayment(100.0);

// Bọc thêm mã giảm giá 10%
myPayment = new DiscountDecorator(myPayment, 10); // Còn 90$

// Bọc thêm phí xử lý 5$
myPayment = new ProcessingFeeDecorator(myPayment); // Thành 95$

// Lấy số tiền cuối cùng sau khi đã qua các lớp Decorator
const finalAmount = myPayment.getAmount();

// Chọn phương thức thanh toán (Strategy)
const paymentMethod = new PayPalStrategy(); 
paymentMethod.pay(finalAmount); // Kết quả: Thanh toán 95$ qua PayPal