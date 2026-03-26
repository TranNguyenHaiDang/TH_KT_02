// Các Class Trạng thái (States)
class NewState {
    process(order) {
        console.log("[Mới tạo]: Đang kiểm tra thông tin đơn hàng...");
        order.setState(new ProcessingState()); // Tự động chuyển trạng thái
    }
}

class ProcessingState {
    process(order) {
        console.log("[Đang xử lý]: Đang đóng gói và vận chuyển...");
        order.setState(new DeliveredState());
    }
}

class DeliveredState {
    process(order) {
        console.log("[Đã giao]: Đơn hàng đã được giao thành công. Cập nhật hệ thống.");
    }
}

class CancelledState {
    process(order) {
        console.log("[Hủy]: Hủy đơn hàng và hoàn tiền cho khách.");
    }
}

// Lớp ngữ cảnh (Context)
class Order {
    constructor() {
        this.state = new NewState(); // Trạng thái mặc định
    }

    setState(state) {
        this.state = state;
    }

    processOrder() {
        this.state.process(this);
    }

    cancelOrder() {
        this.setState(new CancelledState());
        this.state.process(this);
    }
}

// --- Chạy thử nghiệm ---
const myOrder = new Order();
myOrder.processOrder(); // Mới tạo -> Đang xử lý
myOrder.processOrder(); // Đang xử lý -> Đã giao
myOrder.processOrder(); // Đã giao

console.log("\n--- Đơn hàng thứ 2 ---");
const order2 = new Order();
order2.processOrder(); // Mới tạo
order2.cancelOrder();  // Bị hủy giữa chừng