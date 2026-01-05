import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose}) => {
    if(!isOpen) return null;

    return(
        <div className="cart-drawer-overlay" onClick={onclose}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
               <h3>cart</h3>

               <div className="cart-items">

               </div>

               <Link to="/cart" className="view-cart-btn" onClick={close}>
               View Cart
               </Link>
               <Link to="/checkout" className="view-cart-btn" onClick={close}>
               View Cart
               </Link>
            </div>

        </div>
    );
}