import Order from '../../components/Delivery Exexcutive/order';

export default function DeliveryAdmin(props){
    return <div style={{width:"100%",maxWidth:"1000px",margin:"auto",padding:"1em"}}>
    <h3>Orders in Your City</h3>
    <Order/>
    <Order/>
    <Order/>
    <Order/>
    </div>;
}