import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { MinusCircle, PlusCircle } from "react-feather";
function CartFill(props) {
  const [cart, setCart] = useContext(CartContext);
  const currency = "kr.";
  const zeroes = ",00 ";
  const fullPrice = zeroes + currency;
  const deliveryCost = 29;
  let totalPrice =
    cart.reduce(
      (acc, curr) => acc + parseInt(curr.price * curr.qty),
      deliveryCost
    ) + deliveryCost;
  useEffect(() => {
    totalPrice =
      cart.reduce((acc, curr) => acc + parseInt(curr.price), 0) + deliveryCost;
  }, [cart]);
  const removeFromOrder = (id) => {
    const newCart = cart.filter((Cart) => Cart.id !== id);
    setCart(newCart);
  };
  const increaseBasket = (id) => {
    setCart(
      cart.map((CartItem) =>
        CartItem.id === id ? { ...CartItem, qty: CartItem.qty + 1 } : CartItem
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Din kurv</span>
            <span class="badge badge-secondary badge-pill">{cart.length}</span>
          </h4>
          <ul class="list-group mb-3">
            {cart.map((doc) => (
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">
                    {" "}
                    {doc.name}{" "}
                    <PlusCircle
                      onClick={() => increaseBasket(doc.id)}
                      className="cursor-pointer"
                      size={18}
                      color={"var(--clr-green-dark)"}
                    />
                    <a>{doc.qty}</a>
                    <MinusCircle
                      onClick={() => props.decreaseBasket(doc.id, doc.qty)}
                      className="cursor-pointer"
                      size={18}
                      color={"var(--clr-red-dark)"}
                    />
                  </h6>

                  <small class="text-muted"></small>
                </div>
                <span class="text-muted">
                  {doc.price}
                  {fullPrice}
                </span>
              </li>
            ))}

            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>saveameal</small>
              </div>
              <span class="text-success">-14{fullPrice}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (DKK)</span>
              <strong>
                {totalPrice}
                {fullPrice}
              </strong>
            </li>
          </ul>

          <form class="card p-2">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Promo code"
              />
              <div class="input-group-append">
                <button type="submit" class="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Personlige oplysninger</h4>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Navn</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder="Indtast dit fornavn"
                  required
                />
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Efternavn</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Indtast dit efternavn"
                  required
                />
                <div class="invalid-feedback">Valid last name is required.</div>
              </div>
            </div>
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Indtast din email"
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <h4 class="mb-3">Leveringsadresse</h4>
            <div class="mb-3">
              <label for="address">Addresse</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Indtast vejnavn"
                required
              />
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div class="mb-3">
              <label for="zip">Postnummer</label>
              <input
                type="text"
                class="form-control"
                id="zip"
                placeholder="Indtast dit postnummer"
              />
            </div>

            <hr class="mb-4" />
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="same-address"
              />
              <label class="custom-control-label" for="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="save-info"
              />
              <label class="custom-control-label" for="save-info">
                Save this information for next time
              </label>
            </div>
            <hr class="mb-4" />

            <h4 class="mb-3">Payment</h4>

            <div class="d-block my-3">
              <div class="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  checked
                  required
                />
                <label class="custom-control-label" for="credit">
                  Kort
                </label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  id="mobilepay"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  required
                />
                <label class="custom-control-label" for="debit">
                  Mobile pay
                </label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  required
                />
                <label class="custom-control-label" for="paypal">
                  PayPal
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Navn på kort</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                />
                <small class="text-muted">
                  indtast navnet der står på dit kort
                </small>
                <div class="invalid-feedback">Name on card is required</div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                />
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                />
                <div class="invalid-feedback">Expiration date required</div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-cvv">CVV</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                />
                <div class="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr class="mb-4" />
            <button class="btn btn-primary btn-lg btn-block" type="submit">
              Bestil og betal med kort ({totalPrice}
              {fullPrice})
            </button>
          </form>
        </div>
      </div>
      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; Save-a-meal</p>
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Support</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default CartFill;
