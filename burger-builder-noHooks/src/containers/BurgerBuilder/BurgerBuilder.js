import React, { Component } from "react";
import Auxi from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Burger/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as BurgerBuilderActions from "../../store/actions/index";

const ING_PRICE = {
  meat: 30,
  salad: 10,
  cheese: 20,
  bacon: 35,
};
class BurgerBuilder extends Component {
  state = {
    ordering: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onInitIngridients();
  }

  updateOrdering = () => {
    this.setState({
      ordering: !this.state.ordering,
    });
  };

  updateOrderNow = (ing) => {
    for (const item in ing) {
      if (ing[item] > 0) return true;
    }
    return false;
  };

  proceedWithOrder = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    let disabledItem = { ...this.props.ings };
    for (let item in this.props.ings) {
      if (this.props.ings[item] === 0) disabledItem[item] = true;
      else disabledItem[item] = false;
    }

    let BurgerbuilderBody = <Spinner></Spinner>;

    if (this.props.ings) {
      BurgerbuilderBody = (
        <Auxi>
          <div>
            <Burger ingridients={this.props.ings}></Burger>
          </div>
          <BuildControls
            ingridients={this.props.ings}
            incClicked={this.props.onIngridientAdd}
            descClicked={this.props.onIngridientRemove}
            disabled={disabledItem}
            price={this.props.price}
            orderNow={this.updateOrderNow(this.props.ings)}
            updateOrdering={this.updateOrdering}
            isAuth={this.props.isAuth}
          ></BuildControls>
        </Auxi>
      );
    }

    return (
      <Auxi>
        <Modal show={this.state.ordering} updateOrdering={this.updateOrdering}>
          <OrderSummary
            ingridients={this.props.ings}
            costs={ING_PRICE}
            totalAmount={this.props.price}
            proceed={this.proceedWithOrder}
            cancel={this.updateOrdering}
          ></OrderSummary>
        </Modal>
        {BurgerbuilderBody}
      </Auxi>
    );
  }
}

const mapPropsToState = (state) => {
  console.log(state);
  return {
    ings: state.BurgerBuilder.ingridients,
    price: state.BurgerBuilder.price,
    isAuth: state.Auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngridientAdd: (ingName) =>
      dispatch(BurgerBuilderActions.addIngridient(ingName)),
    onIngridientRemove: (ingName) =>
      dispatch(BurgerBuilderActions.removeIngridient(ingName)),
    onInitIngridients: () => {
      dispatch(BurgerBuilderActions.initIngridients());
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(BurgerBuilder);
