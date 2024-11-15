import axios from 'axios';
import { getAuthHeaders } from './apiGetInfomations';

export interface Order {
  productId: number;
  userId: number;
  voucherId: null;
  orderQuantity: number;
  deliveryAddress: string;
  totalCost: number;
  orderState: string;
  paymentMethod: string;
}
const headers = getAuthHeaders();
export const postOrder = async (order: Order): Promise<any> => {
  try {
    const response = await axios.post('http://localhost:8080/api/orders', order, { headers });
    if (response.status === 200) {
      console.log('Order posted successfully:', response.data);
      return response;
    } else {
      console.error('Failed to post order:', response.status);
      return null;
    }
  } catch (error:any) {
    if (error.response) {
      if (error.response.status === 200) {
        console.log('Order posted successfully:', error.response.data);
      } else if (error.response.status === 400) {
        if (error.response.data.message === "Not enough product quantity to place the order.") {
          alert('Không đủ số lượng sản phẩm để đặt hàng.');
        } else {
          alert('Đã xảy ra lỗi khi thanh toán.');
        }
      } else {
        alert('Đã xảy ra lỗi khi thanh toán.');
      }
    } else {
      console.error('Error posting order:', error);
      alert('Đã xảy ra lỗi khi thanh toán.'); 
    }
    return null;
  }
};
