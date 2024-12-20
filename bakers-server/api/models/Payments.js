const mongoose=require('mongoose');
const {Schema}=mongoose;

const paymentSchema = new Schema({
    transitioinId: String,
    email: String,
    price: Number,
    quantity: Number,
    status: String,
    itemName: Array,
    cartItems: Array,
    menuItems: Array,
    createdAt: {
        tyope: Date,
        default: Date.now
    }
})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;   