import axios from 'axios';
import { MAIN_URL } from '@/common/Url';
export function userLogin(data)
{
    return axios.post(`${MAIN_URL}login`,data)
}
export function userRegister(data)
{
    return axios.post(`${MAIN_URL}register`,data)
}
export function userContact(data)
{
    return axios.post(`${MAIN_URL}contact`,data)
}
export function banner()
{
    return axios.get(`${MAIN_URL}banner`)
}
export function category()
{
    return axios.get(`${MAIN_URL}category`)
}
export function categorybyid(id)
{
    return axios.get(`${MAIN_URL}category/${id}`)
}
export function product()
{
    return axios.get(`${MAIN_URL}product`)
}
export function productDetails(id)
{
    return axios.get(`${MAIN_URL}productdetails/${id}`)
}
export function cmsDetails(id)
{
    return axios.get(`${MAIN_URL}cmsdetails/${id}`)
}

export function profile()
{
    var token = localStorage.getItem('token');
    return axios.get(`${MAIN_URL}profile`, { headers: { "Authorization": `Bearer ${token}` } })
}
export function Updateprofile(data){
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}updateProfile`,data,{ headers: { "Authorization": `Bearer ${token}` }})
}
export function changePassword(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}changepass`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function coupon()
{
    return axios.get(`${MAIN_URL}coupon`)
}
export function cmslist()
{
    return axios.get(`${MAIN_URL}cms`)
}
export function userWish(data)
{
    return axios.post(`${MAIN_URL}wish`,data)
}

export function userWishlist(id)
{
    return axios.get(`${MAIN_URL}wishlist/${id}`)
}
export function deletewishlist(id){
    return axios.get(`${MAIN_URL}wish/${id}`)
}
export function checkCoupon(code){
    return axios.post(`${MAIN_URL}checkCoupon`,code)
}
export function userAddress(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}useraddress`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function order(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}order`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function orderProduct(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}orderproduct`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function usedCoupon(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}usedcoupon`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function viewOrder(id)
{
    var token = localStorage.getItem('token');
    return axios.get(`${MAIN_URL}viewOrder/${id}`, { headers: { "Authorization": `Bearer ${token}` } })

}
export function address(id){
    var token = localStorage.getItem('token');
    return axios.get(`${MAIN_URL}addresses/${id}`,{ headers: { "Authorization": `Bearer ${token}` } })
}
export function deladdress(id){
    var token = localStorage.getItem('token');
    return axios.delete(`${MAIN_URL}deladdress/${id}`,{ headers: { "Authorization": `Bearer ${token}` } })
}
export function newsletter(email){
    return axios.get(`${MAIN_URL}newsletter/${email}`);
}
export default {userLogin,userRegister,userContact,banner,category,categorybyid,product,coupon,profile,cmslist,userWish,userWishlist,deletewishlist,checkCoupon,userAddress,viewOrder,newsletter};